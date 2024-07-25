// src/pages/IngredientDetailList.tsx
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RiEditLine, RiDeleteBinLine, RiArrowLeftSLine } from 'react-icons/ri';
import fridgeIngredientData from '../data/fridgeIngredientData.json';
import DeleteModal from '../components/DeleteModal.tsx';
import EditModal from '../components/EditModal.tsx';
import { FridgeIngredient } from '../types/ingredientType';

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function IngredientDetailList() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState<FridgeIngredient | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletedIngredientName, setDeletedIngredientName] = useState<
    string | null
  >(null);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      if (id) {
        const foundIngredient = fridgeIngredientData.find(
          (item) => item.id === Number(id),
        );
        if (foundIngredient) {
          setIngredient(foundIngredient);
        } else {
          setError('재료를 찾을 수 없습니다.');
        }
      } else {
        setError('유효하지 않은 ID입니다.');
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = useCallback(() => {
    if (id && ingredient) {
      setDeletedIngredientName(ingredient.fridgeIngreName);
      setIsDeleteModalOpen(false);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate('/ingredientView');
      }, 2000);
    }
  }, [id, ingredient, navigate]);

  const handleEdit = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  const handleSave = useCallback((updatedIngredient: FridgeIngredient) => {
    setIngredient(updatedIngredient);
    // 여기에 API 호출 또는 상태 업데이트 로직을 추가하세요
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!ingredient) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {deletedIngredientName}이(가) 삭제되었습니다.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md h-full max-h-[844px] flex flex-col bg-white border-gray-500 rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col p-4 bg-white shadow">
          <div className="flex items-center mb-2">
            <motion.button
              className="mr-2"
              onClick={() => navigate('/ingredientView')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RiArrowLeftSLine size={24} />
            </motion.button>
            <h2 className="text-lg font-bold">재료 상세 정보</h2>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="p-4 mb-4 bg-white border-gray-500 rounded-2xl shadow-2xl">
            <h3 className="text-xl font-bold mb-4">
              {ingredient.fridgeIngreName}
            </h3>
            <InfoItem
              label="소비기한"
              value={ingredient.expirationDate || '정보 없음'}
            />
            <InfoItem
              label="개수"
              value={
                ingredient.quantity !== undefined
                  ? `${ingredient.quantity}`
                  : '정보 없음'
              }
            />
            <InfoItem
              label="중량"
              value={
                ingredient.weight !== undefined
                  ? `${ingredient.weight}g`
                  : '정보 없음'
              }
            />
            <InfoItem
              label="카테고리"
              value={ingredient.ingredient.category || '정보 없음'}
            />
            {ingredient.ingredient.mdCategory && (
              <InfoItem
                label="중분류"
                value={ingredient.ingredient.mdCategory}
              />
            )}
            {ingredient.ingredient.sbCategory && (
              <InfoItem
                label="소분류"
                value={ingredient.ingredient.sbCategory}
              />
            )}
            <InfoItem
              label="등록일"
              value={ingredient.createdDate || '정보 없음'}
            />
            {ingredient.memo && (
              <div className="mt-4 p-3 bg-slate-200 rounded-lg">
                <h4 className="font-semibold mb-2">메모</h4>
                <p className="text-gray-600">{ingredient.memo}</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 space-y-2">
          <motion.button
            className="w-full bg-sky-500 text-white rounded-lg py-3 px-4 text-sm font-semibold hover:bg-sky-600 active:bg-sky-700 transition duration-150 ease-in-out shadow-md"
            onClick={handleEdit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RiEditLine className="inline-block mr-2" size={20} />
            수정
          </motion.button>
          <motion.button
            className="w-full bg-red-400 text-white rounded-lg py-3 px-4 text-sm font-semibold hover:bg-red-500 active:bg-red-600 transition duration-150 ease-in-out shadow-md"
            onClick={() => setIsDeleteModalOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RiDeleteBinLine className="inline-block mr-2" size={20} />
            삭제
          </motion.button>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        ingredient={ingredient}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        ingredient={ingredient}
        onSave={handleSave}
      />
    </div>
  );
}

export default IngredientDetailList;
