import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import { RiEditLine } from 'react-icons/ri';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';
import { FridgeIngredient } from '../types/ingredientType';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredient: FridgeIngredient | null;
  onSave: (updatedIngredient: FridgeIngredient) => void;
}

function EditModal({
  isOpen,
  onClose,
  ingredient,
  onSave,
}: EditModalProps): React.ReactElement {
  const [editedIngredient, setEditedIngredient] = useState<FridgeIngredient>({
    fridgeId: 0,
    id: 0,
    fridgeIngreName: '',
    ingredient: {
      id: 0,
      originName: '',
      category: '',
    },
    createdDate: '',
    expirationDate: '',
    quantity: 0,
    weight: 0,
    memo: '',
  });

  useEffect(() => {
    if (ingredient) {
      setEditedIngredient({ ...ingredient });
    }
  }, [ingredient]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditedIngredient((prev: FridgeIngredient) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setEditedIngredient((prev: FridgeIngredient) => ({
        ...prev,
        expirationDate: date.toISOString().split('T')[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedIngredient);
    onClose();
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
            <h3 className="text-xl font-bold mb-4 text-gray-800">재료 수정</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="fridgeIngreName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  재료 이름
                </label>
                <input
                  type="text"
                  id="fridgeIngreName"
                  name="fridgeIngreName"
                  value={editedIngredient.fridgeIngreName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="expirationDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  소비기한
                </label>
                <DatePicker
                  selected={
                    editedIngredient.expirationDate
                      ? new Date(editedIngredient.expirationDate)
                      : null
                  }
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  개수
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={editedIngredient.quantity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  중량 (g)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={editedIngredient.weight}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  카테고리
                </label>
                <select
                  id="category"
                  name="category"
                  value={editedIngredient.ingredient.category}
                  onChange={(e) =>
                    setEditedIngredient((prev: FridgeIngredient) => ({
                      ...prev,
                      ingredient: {
                        ...prev.ingredient,
                        category: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  required
                >
                  <option value="">카테고리 선택</option>
                  <option value="채소">채소</option>
                  <option value="과일">과일</option>
                  <option value="육류">육류</option>
                  <option value="해산물">해산물</option>
                  <option value="유제품">유제품</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="memo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  메모
                </label>
                <textarea
                  id="memo"
                  name="memo"
                  value={editedIngredient.memo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  rows={3}
                />
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
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 text-sm flex flex-col items-center w-1/2"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RiEditLine size={24} className="mb-1" />
                  수정
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EditModal;
