import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

function GlobalHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.token !== null);
  const username = useAuthStore((state) => state.user?.username || '');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
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
              className="absolute top-4 left-5 cursor-pointer text-slate-800 font-bold"
              onClick={closeMenu}
              aria-label="메뉴 닫기"
            >
              ✕
            </button>
            <div className="p-5 mt-10">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3 mb-5">
                  <img
                    src="/path/to/avatar.png" // Replace with the actual path to the avatar image
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{username}</p>
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
                    className="block py-2 text-slate-800 hover:font-bold"
                    onClick={toggleMenu}
                  >
                    로그인
                  </Link>
                  <Link
                    to="/signup"
                    className="block py-2 text-slate-800 hover:font-bold"
                    onClick={toggleMenu}
                  >
                    회원가입
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
