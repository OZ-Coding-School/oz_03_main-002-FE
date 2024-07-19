import { useState } from 'react';
import Slider from './Slider.tsx';
import './Slider.css';
import { Refrigerator } from '../types/fridgeType.ts';
import { IoEllipsisVerticalCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';

type FridgeItemProps = {
  item: Refrigerator;
};

function FridgeItem({ item }: FridgeItemProps) {
  const [isSelector, setIsSelector] = useState(false);
  if (!item) {
    return null;
  }

  const toggleSelector = () => {
    setIsSelector(!isSelector);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full relative text-center p-2 bg-sky-300/0 rounded-t-2xl">
        <h3 className="font-bold ">{item.fridgeName}</h3>
        <button
          type="button"
          onClick={toggleSelector}
          className="absolute w-6 h-6 top-2 right-2 text-xl text-slate-800"
        >
          <IoEllipsisVerticalCircle />
        </button>
        {isSelector && (
          <div className="flex flex-col absolute top-13 right-5 px-4 py-1 text-xs bg-white  rounded-md z-10 border border-sky-400">
            <Link to="/fridges" className="hover:font-bold">
              냉장고 이름 변경
            </Link>
            <Link to="/recipes" className="hover:font-bold">
              냉장고 삭제
            </Link>
          </div>
        )}
      </div>
      <Slider ingredients={item.ingreList} sliderId={item.id} />
      <button
        type="button"
        className="m-3  bg-amber-700/40 rounded-2xl py-1 px-16 self-center"
      >
        <Link to="/IngredientView">재료 목록 보기</Link>
      </button>
      <div></div>
    </div>
  );
}

export default FridgeItem;
