// ModalForm.tsx
import React, { useState } from 'react';
// import InputField from './InputField.tsx';

type ModalFormProps = {
  title: string;
  initialData: { fridgeName: string };
  onSubmit: (data: { fridgeName: string }) => void;
  onClose: () => void;
};

function ModalForm({ title, initialData, onSubmit, onClose }: ModalFormProps) {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    const submittedData = { ...formData };
    if (submittedData.fridgeName.trim() === '') {
      submittedData.fridgeName = '냉장고';
    }
    onSubmit(submittedData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="fridgeName"
            value={formData.fridgeName}
            onChange={handleInputChange}
            placeholder="냉장고 이름을 입력하세요"
            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            제출
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded "
          >
            닫기
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
