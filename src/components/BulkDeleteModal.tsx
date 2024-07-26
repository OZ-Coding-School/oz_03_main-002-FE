import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FridgeIngredient } from '../types/ingredientType';

// 모달 컴포넌트의 props 인터페이스 정의
interface BulkDeleteModalProps {
  isOpen: boolean; // 모달 열림 상태 isOpen
  onClose: () => void; // 모달 닫기 함수 onClose
  selectedIngredients: FridgeIngredient[]; // 선택된 재료 목록 selectedIngredients
  onConfirm: () => void; // 삭제 확인 함수 onConfirm
}

/**
 * 재료 일괄 삭제를 위한 모달 컴포넌트
 *
 * @param {BulkDeleteModalProps} props - 컴포넌트 props
 * @returns {React.ReactElement | null} modal 컴포넌트 또는 null
 */
function BulkDeleteModal({
  isOpen,
  onClose,
  selectedIngredients,
  onConfirm,
}: BulkDeleteModalProps): React.ReactElement | null {
  // modal이 닫혀있으면 null 반환
  if (!isOpen) return null;

  // 선택된 재료가 없는 경우 경고 메시지 표시
  const isWarning = selectedIngredients.length === 0;

  return (
    <AnimatePresence>
      {/* modal 배경 스타일 정의 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50"
      >
        {/* modal 내용 스타일 정의 */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white p-4 rounded-lg shadow-xl max-w-md w-full mx-4"
        >
          {/* modal 제목 스타일 정의 */}
          <h3 className="text-base font-bold mb-3">
            {isWarning ? '알림' : '재료 일괄 삭제'}
          </h3>

          {/* modal 내용 스타일 정의 */}
          {isWarning ? (
            <p className="mb-4 text-sm">
              재료가 최소 1개 이상 선택되어야 삭제할 수 있어요.
            </p>
          ) : (
            <p className="mb-4 text-sm">
              선택한 {selectedIngredients.length}개의 재료를 삭제하시겠습니까?
            </p>
          )}

          {/* modal 창 버튼 영역 */}
          <div className="flex justify-between mt-4">
            {/* 취소 또는 확인 버튼 */}
            <motion.button
              type="button"
              onClick={onClose}
              className={`${
                isWarning
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
              } rounded-lg py-2 px-4 text-sm flex flex-col items-center ${
                isWarning ? 'w-full' : 'mr-2 w-1/2'
              }`}
              whileHover={{
                scale: 1.02,
                boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              {isWarning ? (
                '확인'
              ) : (
                <>
                  <IoCloseOutline size={24} className="mb-1" />
                  취소
                </>
              )}
            </motion.button>

            {/* modal 삭제 버튼 (경고 상태가 아닐 때만 표시) */}
            {!isWarning && (
              <motion.button
                type="button"
                onClick={onConfirm}
                className="bg-red-400 hover:bg-red-500 text-white rounded-lg py-2 px-4 text-sm flex flex-col items-center w-1/2"
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <RiDeleteBinLine size={24} className="mb-1" />
                삭제
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default BulkDeleteModal;
