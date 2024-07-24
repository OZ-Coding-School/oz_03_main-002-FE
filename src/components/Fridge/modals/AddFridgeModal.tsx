import ModalForm from '../../common/ModalForm.tsx';
import { Refrigerator } from '../../../types/fridgeType';

type AddFridgeModalProps = {
  onSubmit: (data: { fridgeName: string }) => void;
  onClose: () => void;
};

function AddFridgeModal({ onSubmit, onClose }: AddFridgeModalProps) {
  const initialData: Omit<Refrigerator, 'id'> = {
    fridgeName: '',
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
}

export default AddFridgeModal;
