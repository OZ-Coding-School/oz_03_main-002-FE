// src/components/NavBar.tsx
import { Link } from 'react-router-dom';
import { FaRegPlusSquare, FaHome, FaUser, FaHeart } from 'react-icons/fa';

function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/"
          className="flex flex-col items-center text-gray-600 hover:text-green-500"
        >
          <FaHome className="text-xl mb-1" />
          <span className="text-xs">홈</span>
        </Link>
        <Link
          to="/search"
          className="flex flex-col items-center text-gray-600 hover:text-green-500"
        >
          <FaRegPlusSquare className="text-xl mb-1" />
          <span className="text-xs">냉장고</span>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center text-gray-600 hover:text-green-500"
        >
          <FaHeart className="text-xl mb-1" />
          <span className="text-xs">즐겨찾기</span>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center text-gray-600 hover:text-green-500"
        >
          <FaUser className="text-xl mb-1" />
          <span className="text-xs">프로필</span>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
