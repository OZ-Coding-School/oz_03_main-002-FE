import React, { useState } from 'react';
import { Refrigerator } from '../../../types/fridgeType';

type EditFridgeModalProps = {
  existingData: Refrigerator;
  onClose: () => void;
  onEdit: (newData: Omit<Refrigerator, 'updatedAt'>) => void;
};

function EditFridgeModal({
  existingData,
  onClose,
  onEdit,
}: EditFridgeModalProps) {
  const [newFridgeName, setNewFridgeName] = useState(existingData.fridgeName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit({
      ...existingData,
      fridgeName: newFridgeName,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">냉장고의 이름을 수정합니다</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newFridgeName}
            onChange={(e) => setNewFridgeName(e.target.value)}
            placeholder="냉장고 이름"
            className="mb-4 p-2 border block"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            수정
          </button>
          <button
            type="button"
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            닫기
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditFridgeModal;
