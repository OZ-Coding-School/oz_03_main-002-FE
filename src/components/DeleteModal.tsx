import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FridgeIngredient } from '../types/ingredientType';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredient: FridgeIngredient | null;
  onConfirm: () => void;
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm text-gray-600">{label}:</span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function DeleteModal({
  isOpen,
  onClose,
  ingredient,
  onConfirm,
}: DeleteModalProps): React.ReactElement | null {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!ingredient) return null;

  const handleDelete = () => {
    setIsDeleting(true);
    onConfirm();
    setTimeout(() => {
      setIsDeleting(false);
      onClose();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              재료 삭제 확인
            </h3>
            <div className="mb-4">
              <p className="font-semibold mb-2 text-gray-700">
                {ingredient.fridgeIngreName}을(를) 삭제하시겠습니까?
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
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
                  <div className="mt-2">
                    <span className="font-semibold text-sm text-gray-600">
                      메모:
                    </span>
                    <p className="text-sm text-gray-600">{ingredient.memo}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <motion.button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg py-2 px-4 text-sm flex flex-col items-center mr-2 w-1/2"
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <IoCloseOutline size={24} className="mb-1" />
                취소
              </motion.button>
              <motion.button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-4 text-sm flex flex-col items-center w-1/2"
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                }}
                whileTap={{ scale: 0.95 }}
                animate={isDeleting ? { scale: 0.9, opacity: 0 } : {}}
              >
                <RiDeleteBinLine size={24} className="mb-1" />
                삭제
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteModal;
