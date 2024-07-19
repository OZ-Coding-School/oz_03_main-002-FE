import React, { useState } from 'react';
import { RefrigeratorMode } from '../../types/fridgeType';

type PopupModalProps = {
  mode: RefrigeratorMode;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

const PopupModal: React.FC<PopupModalProps> = ({ mode, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    ingredients: [],
  });

  const getTitle = () => {
    switch (mode) {
      case 'add':
        return '냉장고 추가';
      case 'edit':
        return '냉장고 수정';
      case 'delete':
        return '냉장고 삭제';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">{getTitle()}</h2>
        {mode !== 'delete' && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="냉장고 이름"
              className="mb-4 p-2 border"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              제출
            </button>
          </form>
        )}
        {mode === 'delete' && (
          <button
            onClick={() => onSubmit(formData)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            삭제
          </button>
        )}
        <button
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
