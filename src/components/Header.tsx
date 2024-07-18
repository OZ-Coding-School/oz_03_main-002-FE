import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-500' : 'text-gray-600';
  };

  return (
    <header className="bg-white shadow-md h-[76px]">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">
          냉똑이 테스트 페이지
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className={`${isActive('/')} hover:text-blue-500 transition duration-300`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="Login"
                className={`${isActive('../pages/Login')} hover:text-blue-500 transition duration-300`}
              >
                Login 페이지
              </Link>
            </li>
            <li>
              <Link
                to="/LoginToEmail"
                className={`${isActive('../pages/LoginToEmail')} hover:text-blue-500 transition duration-300`}
              >
                E-mail 로그인 페이지
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className={`${isActive('/signup')} hover:text-blue-500 transition duration-300`}
              >
                회원가입
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
