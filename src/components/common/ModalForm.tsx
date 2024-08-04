// ModalForm.tsx
import React, { useState } from 'react';
// import InputField from './InputField.tsx';
import { motion } from 'framer-motion';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white p-5 rounded-lg"
      >
        <h2 className="text-lg mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="fridgeName"
            type="text"
            value={formData.fridgeName}
            onChange={handleInputChange}
            placeholder="냉장고 이름을 입력하세요"
            className="px-3 py-2 block w-full sm:text-sm border border-gray-300 placeholder:text-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white px-8 py-2 rounded-lg mr-6"
          >
            제출
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 bg-custom-gray-2 text-white px-8 py-2 rounded-lg"
          >
            닫기
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ModalForm;
