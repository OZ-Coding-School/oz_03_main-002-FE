// AddFridgeModal.tsx
import React from 'react';
import ModalForm from '../../common/ModalForm';
import { Refrigerator } from '../../../types/fridgeType';

type AddFridgeModalProps = {
  onSubmit: (data: { fridgeName: string }) => void;
  onClose: () => void;
};

const AddFridgeModal: React.FC<AddFridgeModalProps> = ({
  onSubmit,
  onClose,
}) => {
  const initialData: Omit<Refrigerator, 'id'> = {
    fridgeName: '냉장고',
    ingreList: [],
    createAt: '',
    updateAt: '',
  };

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
