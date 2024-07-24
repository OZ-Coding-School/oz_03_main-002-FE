import { useState } from 'react';
import { Link } from 'react-router-dom';

function GlobalHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-full h-12 flex justify-between items-center px-5 shadow-lg z-30 ">
      <h2 className="font-bold">냉똑이</h2>
      <button
        type="button"
        className="text-2xl cursor-pointer text-slate-800"
        onClick={toggleMenu}
      >
        {/* 햄버거 버튼 */}
        &#9776;
      </button>
      {isOpen && (
        <div className="flex flex-col bg-slate-600/20 absolute top-13 right-5 p-2 rounded-md">
          <Link to="/fridges" className="hover:font-bold">
            냉장고 목록
          </Link>
          <Link to="/IngredientView" className="hover:font-bold">
            냉장고 재료 관리
          </Link>
          <Link to="/recipes" className="hover:font-bold">
            레시피 목록
          </Link>
        </div>
      )}
    </div>
  );
}

export default GlobalHeader;
