import React, { useState } from 'react';
import Slider from './Slider.tsx';
import './Slider.css';
import { Refrigerator } from './type/fridgeType';
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
    <div className="w-full">
      <div className="w-full relative text-center p-2 bg-sky-300/40">
        <div>
          <Link to="/ingredients">{item.fridges_name}</Link>
        </div>
        <div className="absolute w-6 h-6 top-2 right-2 ">
          <button
            type="button"
            onClick={toggleSelector}
            className="w-full h-full text-xl text-slate-800"
          >
            <IoEllipsisVerticalCircle />
          </button>
        </div>
        <div>
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
      </div>
      <Slider ingredients={item.ingre_list} sliderId={item.id} />
      <button type="button">재료 추가</button>
    </div>
  );
}

export default FridgeItem;
