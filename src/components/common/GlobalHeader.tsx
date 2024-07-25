import { useEffect, useState } from 'react';
import { Link, useNavigate, useNavigationType } from 'react-router-dom';
import {
  IoIosArrowBack,
  IoIosMenu,
  IoMdClose,
  IoIosArrowForward,
} from 'react-icons/io';
import useAuthStore from '../../store/useAuthStore';

function GlobalHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.token !== null);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  // const [canGoBack, setCanGoBack] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // useEffect(() => {
  //   if (location.pathname === '/login' || location.pathname === '/signup') {
  //     setCanGoBack(true);
  //   } else {
  //     setCanGoBack(false);
  //   }
  // }, [canGoBack]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full h-12 flex justify-between items-center px-5 shadow-lg z-30 ">
      <div className="w-8 p-0">
        {/* {canGoBack && (
          <button className="w-8 text-2xl" onClick={() => navigate(-1)}>
            <IoIosArrowBack />
          </button>
        )} */}
      </div>
      <h2 className="font-bold">냉똑이</h2>
      <button
        type="button"
        className="w-8 text-2xl  cursor-pointer text-slate-800"
        onClick={toggleMenu}
      >
        <IoIosMenu />
      </button>
      {isOpen && (
        <div className="absolute inset-0 z-40 flex justify-end">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeMenu}
            onKeyDown={(e) => e.key === 'Escape' && closeMenu()}
            role="button"
            tabIndex={0}
            aria-label="메뉴 닫기"
          />
          <div className="relative w-64 bg-white h-full shadow-lg">
            <button
              type="button"
              className="absolute top-4 left-5 cursor-pointer text-slate-800 text-2xl font-bold"
              onClick={closeMenu}
              aria-label="메뉴 닫기"
            >
              <IoMdClose />
            </button>
            <div className="p-5 mt-10">
              {user ? (
                <div className="flex items-center space-x-3 mb-5">
                  <img
                    src="/defaultUserAvatar.png"
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{user?.username}</p>
                    <Link
                      to="/mypage"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      마이페이지
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="mb-5">
                  <Link
                    to="/login"
                    className="py-2 text-slate-800 hover:font-bold flex items-center hover:text-slate-800"
                    onClick={toggleMenu}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    로그인
                    <IoIosArrowForward
                      className={`ml-3 text-slate-400 transform transition-transform duration-500 ${
                        isHovered ? 'translate-x-32' : 'translate-x-0'
                      }`}
                    />
                  </Link>
                </div>
              )}
              <Link
                to="/fridges"
                className="block py-2 hover:font-bold"
                onClick={toggleMenu}
              >
                냉장고 목록
              </Link>
              <Link
                to="/IngredientView"
                className="block py-2 hover:font-bold"
                onClick={toggleMenu}
              >
                냉장고 재료 관리
              </Link>
              <Link
                to="/recipes"
                className="block py-2 hover:font-bold"
                onClick={toggleMenu}
              >
                레시피 목록
              </Link>
              {/* 추가적인 링크나 내용이 있다면 여기에 추가 */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GlobalHeader;
