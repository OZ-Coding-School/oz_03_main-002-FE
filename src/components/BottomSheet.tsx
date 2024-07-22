import React from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { RiEditLine, RiDeleteBinLine } from 'react-icons/ri';
import { Ingredient } from '../types/types';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  ingredients: Ingredient[];
  selectedIds: number[];
  onEdit: (ingredient: Ingredient) => void;
  onDelete: (ingredient: Ingredient) => void;
}

function BottomSheet({
  isOpen,
  onClose,
  ingredients,
  selectedIds,
  onEdit,
  onDelete,
}: BottomSheetProps): React.ReactElement {
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.velocity.y > 20 || info.offset.y > 200) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="fixed bottom-0 left-2 right-2 border-2 border-black-800 bg-white shadow-xl rounded-t-3xl max-w-md mx-auto"
        >
          <div className="w-14 h-1 border-slate-200 bg-gray-300 rounded-full mx-auto my-3" />
          <div className="p-4">
            <h3 className="text-base font-bold mb-3">선택된 재료</h3>
            <div className="max-h-48 overflow-y-auto">
              {ingredients
                .filter((ing) => selectedIds.includes(ing.id))
                .map((ing) => (
                  <motion.div
                    key={ing.id}
                    className="flex justify-between items-center py-2 border-b "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div>
                      <span className="font-semibold text-sm">{ing.name}</span>
                      <span className="text-gray-600 text-xs ml-2">
                        : {ing.quantity}
                      </span>
                      <p className="text-gray-500 text-xs">
                        소비기한: {ing.expirationDate}{' '}
                        {/* 유통기한을 소비기한으로 수정 */}
                      </p>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => onEdit(ing)}
                        className="flex items-center bg-blue-400 text-white rounded-lg py-2 px-3 text-sm mr-2 hover:bg-blue-500 active:bg-blue-600 transition duration-150 ease-in-out"
                      >
                        <RiEditLine size={16} className="mr-1" />
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(ing)}
                        className="flex items-center bg-red-400 text-white rounded-lg py-2 px-3 text-sm hover:bg-red-500 active:bg-red-600 transition duration-150 ease-in-out"
                      >
                        <RiDeleteBinLine size={16} className="mr-1" />
                        삭제
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BottomSheet;
