import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import { RiAddLine } from 'react-icons/ri';
import { Ingredient } from '../types/types'; // 수정된 import 경로

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newIngredient: Omit<Ingredient, 'id'>) => void;
}

function CreateModal({
  isOpen,
  onClose,
  onAdd,
}: CreateModalProps): React.ReactElement {
  const [newIngredient, setNewIngredient] = useState<Omit<Ingredient, 'id'>>({
    name: '',
    quantity: '',
    expirationDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewIngredient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newIngredient);
    setNewIngredient({ name: '', quantity: '', expirationDate: '' });
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
            className="bg-white p-4 rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            <h3 className="text-base font-bold mb-3">재료 추가</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  재료명
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newIngredient.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  수량
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={newIngredient.quantity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="expirationDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  소비기한 {/* 유통기한을 소비기한으로 수정 */}
                </label>
                <input
                  type="date"
                  id="expirationDate"
                  name="expirationDate"
                  value={newIngredient.expirationDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <hr className="my-3 border-gray-300" />
              <div className="flex justify-between mt-4">
                <motion.button
                  type="button"
                  onClick={onClose}
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
                  <IoCloseOutline size={24} className="mb-1" />
                  취소
                </motion.button>
                <motion.button
                  type="submit"
                  className="bg-blue-400 hover:bg-blue-500 text-white rounded-lg py-2 px-4 text-sm flex flex-col items-center w-full"
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
                  <RiAddLine size={24} className="mb-1" />
                  추가
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CreateModal;
