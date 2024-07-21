import React, { useEffect, useState } from 'react';
import { Refrigerator, RefrigeratorMode } from '../../types/fridgeType';

type PopupModalProps = {
  mode: RefrigeratorMode;
  onClose: () => void;
  onSubmit: (data: Omit<Refrigerator, 'id'>) => void;
  existingData?: Refrigerator;
};

function PopupModal({
  mode,
  onClose,
  onSubmit,
  existingData,
}: PopupModalProps) {
  const initialData: Omit<Refrigerator, 'id'> = {
    fridgeName: '',
    createAt: '',
    updateAt: '',
    isActivate: true,
    ingreList: [],
    userId: 'abc123',
  };
  const [formData, setFormData] =
    useState<Omit<Refrigerator, 'id'>>(initialData);

  useEffect(() => {
    if (mode === 'edit' && existingData) {
      setFormData(existingData);
    }
  }, [mode, existingData]);

  const getTitle = () => {
    switch (mode) {
      case 'add':
        return '냉장고를 추가합니다';
      case 'edit':
        return '냉장고의 이름을 수정합니다';
      case 'delete':
        return '냉장고를 삭제합니다';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // setFridgeName(e.target.value);
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
              name="fridgeName"
              value={formData.fridgeName}
              onChange={handleInputChange}
              placeholder="냉장고 이름"
              className="mb-4 p-2 border block"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              제출
            </button>
            <button
              type="button"
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              닫기
            </button>
          </form>
        )}
        {mode === 'delete' && (
          <>
            <button
              type="button"
              onClick={() => onSubmit(formData)}
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
          </>
        )}
      </div>
    </div>
  );
}

PopupModal.defaultProps = {
  existingData: {
    fridgeName: '',
    createAt: '',
    updateAt: '',
    isActivate: true,
    ingreList: [],
    userId: 'abc123',
  },
};

export default PopupModal;
