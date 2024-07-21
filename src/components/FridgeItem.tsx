import React, { useState } from 'react';
import { IoEllipsisVerticalCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useFridgeStore from '../store/useFridgeStore';
import { Refrigerator } from '../types/fridgeType';
import Slider from './Slider.tsx';
import './Slider.css';

type FridgeItemProps = {
  item: Refrigerator;
  onEdit: (item: Refrigerator) => void;
  onDelete: (id: number) => void;
};

function FridgeItem({ item, onDelete, onEdit }: FridgeItemProps) {
  const [isSelector, setIsSelector] = useState(false);
  const setCurrentMode = useFridgeStore((state) => state.setCurrentMode);
  const setShowModal = useFridgeStore((state) => state.setShowModal);

  const toggleSelector = () => {
    setIsSelector(!isSelector);
  };

  const handleFridgeEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onEdit(item);
    setCurrentMode('edit');
    setShowModal(true);
    setIsSelector(false);
  };
  const handleFridgeDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onDelete(item.id);
    setCurrentMode('delete');
    setShowModal(true);
    setIsSelector(false);
  };

  if (!item) {
    return null;
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full relative text-center p-2 bg-sky-300/0 rounded-t-2xl">
        <h3 className="font-bold ">{item.fridgeName}</h3>
        <button
          type="button"
          aria-label="select"
          onClick={toggleSelector}
          className="absolute w-6 h-6 top-2 right-2 text-xl text-slate-800"
        >
          <IoEllipsisVerticalCircle />
        </button>
        {isSelector && (
          <div className="flex flex-col absolute top-13 right-5 px-4 py-1 text-xs bg-white  rounded-md z-10 border border-sky-400">
            <button
              type="button"
              aria-label="Edit Fridge"
              onClick={handleFridgeEdit}
              className="hover:font-bold"
            >
              냉장고 이름 변경
            </button>
            <button
              type="button"
              aria-label="Delete Fridge"
              onClick={handleFridgeDelete}
              className="hover:font-bold"
            >
              냉장고 삭제
            </button>
          </div>
        )}
      </div>
      <Slider ingredients={item.ingreList} sliderId={Number(item.createAt)} />
      <button
        type="button"
        aria-label="moveToIngredientViewPage"
        className="m-3  bg-amber-700/40 rounded-2xl py-1 px-16 self-center"
      >
        <Link to="/IngredientView">재료 목록 보기</Link>
      </button>
      <div />
    </div>
  );
}

export default FridgeItem;
