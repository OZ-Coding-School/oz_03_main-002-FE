// ModalForm.tsx
import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';

type ModalFormProps = {
  title: string;
  initialData: { fridgeName: string };
  onSubmit: (data: { fridgeName: string }) => void;
  onClose: () => void;
};

const ModalForm: React.FC<ModalFormProps> = ({
  title,
  initialData,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState(initialData);

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
        <h2 className="text-xl mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="냉장고 이름"
            name="fridgeName"
            value={formData.fridgeName}
            onChange={handleInputChange}
            placeholder="냉장고 이름을 입력하세요"
          />
          <Button type="submit" label="제출" onClick={handleSubmit} />
          <Button
            type="button"
            label="닫기"
            onClick={onClose}
            className="bg-gray-500"
          />
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
