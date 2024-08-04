import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import { RiAddLine } from 'react-icons/ri';
import { Ingredient } from '../types/types';

// CreateModal 컴포넌트의 props 타입 정의
interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    newIngredient: Omit<Ingredient, 'id'> & { createdDate: string },
  ) => void;
}

/**
 * 날짜를 포맷팅하는 함수
 * @param date - 포맷팅할 Date 객체
 * @returns 'YYYY.MM.DD. HH:MM' 형식의 문자열
 */
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day}. ${hours}:${minutes}`;
};

/**
 * 재료 추가를 위한 모달 컴포넌트
 */
function CreateModal({
  isOpen,
  onClose,
  onAdd,
}: CreateModalProps): React.ReactElement {
  // 새로운 재료의 상태를 관리하는 state
  const [newIngredient, setNewIngredient] = useState<Omit<Ingredient, 'id'>>({
    name: '',
    quantity: '',
    weight: '',
    expirationDate: '',
  });

  // 현재 날짜와 시간을 관리하는 state
  const [currentDate, setCurrentDate] = useState('');

  // 컴포넌트가 마운트될 때 현재 날짜와 시간을 설정하고, 1초마다 업데이트
  useEffect(() => {
    const updateCurrentDate = () => {
      const now = new Date();
      setCurrentDate(formatDate(now));
    };

    updateCurrentDate();
    const timer = setInterval(updateCurrentDate, 1000);

    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => clearInterval(timer);
  }, []);

  /**
   * 입력 필드의 변경을 처리하는 함수
   * @param e - 입력 이벤트 객체
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewIngredient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * 폼 제출을 처리하는 함수
   * @param e - 폼 제출 이벤트 객체
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...newIngredient,
      createdDate: currentDate, // 현재 날짜와 시간을 추가
    });
    // 폼 제출 후 입력 필드 초기화
    setNewIngredient({
      name: '',
      quantity: '',
      weight: '',
      expirationDate: '',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white p-4 rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            <h3 className="text-base font-bold mb-3">재료 추가</h3>
            <form onSubmit={handleSubmit}>
              {/* 재료 추가 날짜 입력 필드 - 현재 날짜 - yyyy-mm-dd */}
              <div className="mb-3">
                <label
                  htmlFor="createdDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  이 재료를 언제 추가했나요?
                </label>
                <input
                  type="text"
                  id="createdDate"
                  name="createdDate"
                  value={currentDate}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
              </div>

              {/* 재료명 입력 필드 스타일 정의 */}
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
                  placeholder="예시) 소고기"
                  name="name"
                  value={newIngredient.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* 수량 입력 필드 스타일 정의 */}
              <div className="mb-3">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  수량(선택)
                </label>
                <input
                  type="text"
                  id="quantity"
                  placeholder="예시) 1개"
                  name="quantity"
                  value={newIngredient.quantity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* 중량 입력 필드 스타일 정의 */}
              <div className="mb-3">
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  중량(선택)
                </label>
                <input
                  type="text"
                  id="weight"
                  placeholder="예시) 180g"
                  name="weight"
                  value={newIngredient.weight}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* 소비기한 입력 필드 스타일 정의 */}
              <div className="mb-3">
                <label
                  htmlFor="expirationDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  소비기한
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

              {/* 취소 및 추가 버튼 스타일 정의 */}
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
