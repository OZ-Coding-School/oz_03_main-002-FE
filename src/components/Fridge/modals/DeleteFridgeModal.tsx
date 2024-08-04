import { motion } from 'framer-motion';
import { Refrigerator } from '../../../types/fridgeType.tsx';

type DeleteFridgeModalProps = {
  existingData: Refrigerator;
  onClose: () => void;
  onDelete: (id: string) => void;
};

function DeleteFridgeModal({
  existingData,
  onClose,
  onDelete,
}: DeleteFridgeModalProps) {
  const handleDelete = () => {
    onDelete(existingData.id);
  };

  return (
    // <ModalForm title="냉장고 삭제" onDelete={onDelete} onClose={onClose} />
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white p-5 rounded-lg shadow-lg"
      >
        <h2 className="text-xl mb-4">냉장고를 삭제합니다</h2>
        <p>정말로 {existingData?.fridgeName} 를 삭제하시겠습니까?</p>
        <button
          type="button"
          onClick={handleDelete}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          삭제
        </button>
        <button
          type="button"
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          닫기
        </button>
      </motion.div>
    </div>
  );
}

export default DeleteFridgeModal;
