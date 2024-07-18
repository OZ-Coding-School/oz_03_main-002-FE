import React, { useState, useRef } from 'react';
// 유연한 애니메이션 적용을 위해 framer-motion 라이브러리 적용.
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
// 아이콘 추가를 위한 react-icons 적용.
import {
  RiEditLine,
  RiDeleteBinLine,
  RiAddLine,
  RiSubtractLine,
} from 'react-icons/ri';
import { IoCloseOutline } from 'react-icons/io5';

// 재료 타입 정의 id=number값, name=string 값, quantity= string 값, expirationDate= string 값

// 각 재료 타입 설명: id = 재료 등록 번호, name= 재료 이름, quantity= 재료 수량, expirationDate= 유통기한
type Ingredient = {
  id: number;
  name: string;
  quantity: string;
  expirationDate: string;
};

const IngredientView: React.FC = () => {
  // 재료 목록 상태
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    // 초기 재료 데이터(샘플 데이터)
    {
      id: 1,
      name: '돼지고기 앞다리살',
      quantity: '1',
      expirationDate: '2023-06-30',
    },
    { id: 2, name: '양파', quantity: '2', expirationDate: '2023-07-15' },
    { id: 3, name: '감자', quantity: '3', expirationDate: '2023-07-31' },
    { id: 4, name: '당근', quantity: '1', expirationDate: '2023-07-31' },
    { id: 5, name: '닭가슴살', quantity: '1', expirationDate: '2023-06-25' },
    { id: 6, name: '두부', quantity: '1', expirationDate: '2023-06-20' },
    { id: 7, name: '계란', quantity: '1', expirationDate: '2023-07-10' },
    { id: 8, name: '우유', quantity: '1', expirationDate: '2023-06-28' },
    { id: 9, name: '토마토', quantity: '4', expirationDate: '2023-07-05' },
    { id: 10, name: '오이', quantity: '2', expirationDate: '2023-07-03' },
    { id: 11, name: '버섯', quantity: '2', expirationDate: '2023-06-22' },
    { id: 12, name: '파', quantity: '1', expirationDate: '2023-07-08' },
    { id: 13, name: '마늘', quantity: '1', expirationDate: '2023-08-15' },
    { id: 14, name: '고추', quantity: '1', expirationDate: '2023-07-07' },
    { id: 15, name: '소고기', quantity: '3', expirationDate: '2023-06-24' },
    {
      id: 16,
      name: '브로콜리',
      quantity: '1',
      expirationDate: '2023-07-02',
    },
    { id: 17, name: '시금치', quantity: '1', expirationDate: '2023-06-29' },
    { id: 18, name: '사과', quantity: '3', expirationDate: '2023-07-20' },
    { id: 19, name: '바나나', quantity: '1', expirationDate: '2023-07-01' },
    { id: 20, name: '오렌지', quantity: '2', expirationDate: '2023-07-12' },
  ]);

  // 선택된 재료 ID 목록 - selectedIds
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // BottomSheet열림 상태 - isBottomsheetOpen
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 삭제 모달 상태 - deleteModalOpen
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] =
    useState<Ingredient | null>(null);

  // 수정 모달 상태 - editModalOpen: 수정하기 버튼을 누르면 모달창 열기
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [ingredientToEdit, setIngredientToEdit] = useState<Ingredient | null>(
    null,
  );

  // 수정 중인 수량
  const [editQuantity, setEditQuantity] = useState(0);

  // 바텀 시트 useRef
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  // 재료 선택 처리
  const handleSelect = (id: number) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id],
    );
    setIsBottomSheetOpen(true);
  };

  // 재료 수정 처리
  const handleEdit = (ingredient: Ingredient) => {
    setIngredientToEdit(ingredient);
    setEditQuantity(parseInt(ingredient.quantity));
    setEditModalOpen(true);
  };

  // 재료 수정 확인
  const confirmEdit = (editedIngredient: Ingredient) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ing) =>
        ing.id === editedIngredient.id ? editedIngredient : ing,
      ),
    );
    setEditModalOpen(false);
    setIngredientToEdit(null);
  };

  // 수량 변경 처리 로직
  const handleQuantityChange = (change) => {
    setEditQuantity((prevQuantity) => Math.max(0, prevQuantity + change));
  };

  // 재료 삭제 처리 로직
  const handleDelete = (ingredient: Ingredient) => {
    setIngredientToDelete(ingredient);
    setDeleteModalOpen(true);
  };

  // 재료 삭제 확인 로직
  const confirmDelete = () => {
    if (ingredientToDelete) {
      setIngredients((prevIngredients) =>
        prevIngredients.filter((ing) => ing.id !== ingredientToDelete.id),
      );
      setSelectedIds((prevIds) =>
        prevIds.filter((prevId) => prevId !== ingredientToDelete.id),
      );
    }
    setDeleteModalOpen(false);
    setIngredientToDelete(null);
  };

  // bottomSheet 닫기
  const closeBottomSheet = () => setIsBottomSheetOpen(false);

  // 선택된 재료 삭제
  const deleteSelectedIngredients = () => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ing) => !selectedIds.includes(ing.id)),
    );
    setSelectedIds([]);
    closeBottomSheet();
  };

  // BottomSheet 드래그 종료 처리(사용자 상호작용 요소) - MouseEvent, TouchEvent, PointerEvent
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.velocity.y > 20 || info.offset.y > 200) {
      closeBottomSheet();
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md h-full max-h-[844px] flex flex-col bg-white shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-white shadow">
          <h2 className="text-left text-lg font-semibold">재료 목록</h2>
          <span className="font-semibold text-sky-500 text-base">
            선택된 재료: {selectedIds.length}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            {ingredients.map((ingredient) => (
              <motion.div
                key={ingredient.id}
                className={`bg-white  p-3 rounded-lg shadow-md cursor-pointer relative ${
                  selectedIds.includes(ingredient.id)
                    ? 'border-2 border-blue-500'
                    : ''
                }`}
                onClick={() => handleSelect(ingredient.id)}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.95,
                  boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                  transition: { duration: 0.1 },
                }}
              >
                <h3 className="font-bold text-sm">{ingredient.name}</h3>
                <p className="text-gray-600 text-xs">{ingredient.quantity}</p>
                <p className="text-gray-500 text-xs">
                  유통기한: {ingredient.expirationDate}
                </p>
                {selectedIds.includes(ingredient.id) && (
                  <span className="absolute top-2 right-2 text-blue-500 text-base">
                    ✓
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {isBottomSheetOpen && (
          <motion.div
            ref={bottomSheetRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            // Bottom Sheet 스타일 속성
            className="fixed bottom-2 left-2 right-2 border-2 border-black-800 bg-white shadow-xl rounded-t-3xl max-w-md mx-auto"
          >
            <div className="w-14 h-1 border-slate-200 bg-gray-300 rounded-full mx-auto my-3" />
            <div className="p-4">
              <h3 className="text-base font-bold mb-3">선택된 재료</h3>
              <div className="max-h-48 overflow-y-auto mb-4">
                {ingredients
                  .filter((ing) => selectedIds.includes(ing.id))
                  .map((ing) => (
                    <motion.div
                      key={ing.id}
                      className="flex justify-between items-center py-2 border-b"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div>
                        <span className="font-semibold text-sm">
                          {ing.name}
                        </span>
                        <span className="text-gray-600 text-xs ml-2">
                          : {ing.quantity}
                        </span>
                        <p className="text-gray-500 text-xs">
                          유통기한: {ing.expirationDate}
                        </p>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => handleEdit(ing)}
                          className="flex items-center bg-blue-400 text-white rounded-lg py-2 px-3 text-sm mr-2
                    hover:bg-blue-500 active:bg-blue-600 transition duration-150 ease-in-out"
                        >
                          <RiEditLine size={16} className="mr-1" />
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(ing)}
                          className="flex items-center bg-red-400 text-white rounded-lg py-2 px-3 text-sm
                    hover:bg-red-500 active:bg-red-600 transition duration-150 ease-in-out"
                        >
                          <RiDeleteBinLine size={16} className="mr-1" />
                          삭제
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
              <div className="flex justify-between" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 삭제 확인 모달 */}
      <AnimatePresence>
        {deleteModalOpen && ingredientToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50" // blur 최적화 후 순위.
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-4 rounded-lg shadow-xl max-w-xs w-full mx-4"
            >
              <h3 className="text-base font-bold mb-3">재료 삭제</h3>
              <p className="mb-2 text-sm">
                {ingredientToDelete.name}을(를) 삭제할까요?
              </p>
              <p className="text-gray-600 text-xs mb-3">
                수량: {ingredientToDelete.quantity}
                <br />
                유통기한: {ingredientToDelete.expirationDate}
              </p>
              <hr className="my-3 border-gray-300" />
              {/* 재료 삭제 모달창 */}
              <div className="flex justify-between mt-4">
                <motion.button
                  onClick={() => setDeleteModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg py-2 px-4 text-sm mr-2 flex flex-col items-center w-36"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                    transition: { duration: 0.1 },
                  }}
                >
                  <IoCloseOutline size={24} className="mb-1" />
                  취소
                </motion.button>
                <motion.button
                  onClick={confirmDelete}
                  className="bg-red-400 hover:bg-red-500 text-white rounded-lg py-2 px-4 text-sm flex flex-col items-center w-36"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                    transition: { duration: 0.1 },
                  }}
                >
                  <RiDeleteBinLine size={24} className="mb-1" />
                  삭제
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 수정하기 모달 */}
      <AnimatePresence>
        {editModalOpen && ingredientToEdit && (
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
              className="bg-white p-4 rounded-lg shadow-xl max-w-xs w-full mx-4"
            >
              <h3 className="text-base font-bold mb-3">재료 수정</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  confirmEdit({
                    ...ingredientToEdit,
                    name: e.target.name.value,
                    quantity: editQuantity,
                    expirationDate: e.target.expirationDate.value,
                  });
                }}
              >
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    이름
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={ingredientToEdit.name}
                    className="mt-1 w-full h-14 text-xl rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-gray-700"
                  >
                    수량
                  </label>
                  <div className="flex items-center mt-1">
                    <input
                      id="quantity"
                      name="quantity"
                      value={editQuantity}
                      onChange={(e) =>
                        setEditQuantity(
                          Math.max(0, parseInt(e.target.value) || 0),
                        )
                      }
                      className="ml-5 w-20 rounded-l-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50  text-4xl"
                    />
                    <div className="flex flex-col">
                      <motion.button
                        type="button"
                        onClick={() => handleQuantityChange(1)}
                        className="bg-gray-200 text-gray-700 rounded-t-md px-2 py-1 h-10 w-10 flex items-center justify-center"
                        whileHover={{ backgroundColor: '#e5e7eb' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <RiAddLine />
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => handleQuantityChange(-1)}
                        className="bg-gray-200 text-gray-700 rounded-b-md px-2 py-1 h-10 w-10 flex items-center justify-center"
                        whileHover={{ backgroundColor: '#e5e7eb' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <RiSubtractLine />
                      </motion.button>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="expirationDate"
                    className="text-sm font-medium text-gray-700"
                  >
                    유통기한
                  </label>
                  <input
                    type="date"
                    id="expirationDate"
                    name="expirationDate"
                    defaultValue={ingredientToEdit.expirationDate}
                    className="mt-1 w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {/* 재료 수정 모달창 속성 */}
                <div className="flex justify-between mt-4">
                  <motion.button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg py-2 px-4 text-sm flex flex-col items-center mr-2 w-full"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{
                      scale: 0.95,
                      boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                      transition: { duration: 0.1 },
                    }}
                  >
                    <IoCloseOutline size={20} className="mb-1" />
                    취소
                  </motion.button>
                  <motion.button
                    type="submit"
                    className=" bg-blue-400 hover:bg-blue-500  text-white rounded-lg py-2 px-4 text-sm flex flex-col items-center w-full"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{
                      scale: 0.95,
                      boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                      transition: { duration: 0.1 },
                    }}
                  >
                    <RiEditLine size={20} className="mb-1" />
                    수정
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IngredientView;
