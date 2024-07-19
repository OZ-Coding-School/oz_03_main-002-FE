import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Ingredient } from '../types/types'; // 수정된 import 경로

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredient: Ingredient | null;
  onConfirm: () => void;
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-4 rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            <h3 className="text-base font-bold mb-3">재료 삭제</h3>
            <p className="mb-2 text-sm">{ingredient.name}을(를) 삭제할까요?</p>
            <p className="text-gray-600 text-xs mb-3">
              수량: {ingredient.quantity}
              <br />
              유통기한: {ingredient.expirationDate}
            </p>
            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between mt-4">
              <motion.button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg py-2 px-4 text-sm flex flex-col items-center mr-2 w-full"
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
                className="bg-red-400 hover:bg-red-500 text-white rounded-lg py-2 px-4 text-sm flex flex-col items-center w-full"
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
