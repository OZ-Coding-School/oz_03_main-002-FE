import React, { useState } from 'react';
import { IoEllipsisVerticalCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useFridgeStore from '../../store/useFridgeStore.ts';
import { Refrigerator } from '../../types/fridgeType.ts';
import Slider from './Slider.tsx';
import './Slider.css';
import EditFridgeModal from './EditFridgeModal.tsx';
import DeleteFridgeModal from './DeleteFridgeModal.tsx';

type FridgeItemProps = {
  item: Refrigerator;
  onClose: () => void;
};

function FridgeItem({ item, onClose }: FridgeItemProps) {
  const [isSelector, setIsSelector] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteFridge = useFridgeStore((state) => state.deleteFridge);

  const toggleSelector = () => {
    setIsSelector(!isSelector);
  };

  const handleEditFridge = (data: Refrigerator) => {
    updateFridge(item.id, data);
  };

  const handleDeleteFridge = () => {
    deleteFridge(item.id);
  };
  // const handleFridgeEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   onEdit(item);
  //   setCurrentMode('edit');
  //   setShowModal(true);
  //   setIsSelector(false);
  // };
  // const handleFridgeDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   onDelete(item.id);
  //   setCurrentMode('delete');
  //   setShowModal(true);
  //   setIsSelector(false);
  // };

  const handleClick = (state) => {
    switch (state) {
      case 'edit':
        setShowEditModal(true);
        setIsSelector(false);
        setSelected;
        break;
      case 'delete':
        setShowDeleteModal(true);
        setIsSelector(false);
      default:
        break;
    }
  };
  if (!item) {
    return null;
  }

  return (
    <div className="w-full flex flex-col relative">
      <div className="w-full h-10 text-center p-2 bg-sky-300/0 rounded-t-2xl">
        <h3 className="font-bold ">{item.fridgeName}</h3>
        <button
          type="button"
          aria-label="select"
          onClick={toggleSelector}
          className="absolute w-6 h-6 top-2 right-2 text-xl text-slate-800"
        >
          <IoEllipsisVerticalCircle />
        </button>
      </div>
      <Slider ingredients={item.ingreList} sliderId={Number(item.createAt)} />
      <button
        type="button"
        aria-label="moveToIngredientViewPage"
        className="m-3  bg-amber-700/40 rounded-2xl py-1 px-16 self-center"
      >
        <Link to="/IngredientView">재료 목록 보기</Link>
      </button>
      {isSelector && (
        <div className="flex flex-col absolute top-8 right-4 px-4 py-1 text-xs bg-white  rounded-md z-10 border border-sky-400">
          <button
            type="button"
            aria-label="Edit Fridge"
            onClick={() => handleClick('edit')}
            className="hover:font-bold"
          >
            냉장고 이름 변경
          </button>
          <button
            type="button"
            aria-label="Delete Fridge"
            onClick={() => handleClick('delete')}
            className="hover:font-bold"
          >
            냉장고 삭제
          </button>
        </div>
      )}
      {showEditModal && (
        <EditFridgeModal onEdit={handleEditFridge} onClose={handleCloseModal} />
      )}
      {showDeleteModal && (
        <DeleteFridgeModal
          onDelete={handleDeleteFridge}
          onClose={onClose}
          existingData={item}
        />
      )}
    </div>
  );
}

export default FridgeItem;
