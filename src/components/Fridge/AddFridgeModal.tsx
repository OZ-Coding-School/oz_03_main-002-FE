// AddFridgeModal.tsx
import React from 'react';
import ModalForm from '../common/ModalForm';

type AddFridgeModalProps = {
  onSubmit: (data: { fridgeName: string }) => void;
  onClose: () => void;
};

const AddFridgeModal: React.FC<AddFridgeModalProps> = ({
  onSubmit,
  onClose,
}) => {
  const initialData = { fridgeName: '냉장고' };

  return (
    <ModalForm
      title="냉장고 추가"
      initialData={initialData}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};

export default AddFridgeModal;
