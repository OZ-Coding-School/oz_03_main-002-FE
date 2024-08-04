import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import { Link } from 'react-router-dom';
import GoogleIcon from '../assets/google-icon.svg';
import useAuthStore from '../store/useAuthStore';

function Login() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  // const googleLogin = useAuthStore((state) => state.googleLogin);
  const login = useAuthStore((state) => state.login);
  // const navigate = useNavigate();

  const [errors, setErrors] = useState({
    id: '',
    password: '',
    username: '',
    email: '',
  });

  // 유효성 검사 함수
  const validateId = (userId: string) =>
    /^(?=.*[a-z])[a-z][A-Za-z\d]{2,14}$/.test(userId);
  const validatePassword = (pw: string) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-_.,?!~])[A-Za-z\d-_.,?!~]{8,20}$/.test(
      pw,
    );
  const validateEmail = (mail: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/.test(mail);

  const handleValidation = () => {
    const newErrors = { id: '', password: '', username: '', email: '' };
    if (!validateId(id))
      newErrors.id =
        '아이디는 소문자로 시작하는 영대소문자 또는 숫자가 포함되된 2자 이상 14자 이하로 입력해주세요.';
    if (!validatePassword(password))
      newErrors.password =
        '비밀번호는 영문 대소문자, 숫자, 특수문자가 포함된 8자 이상 20자 이하로 입력해주세요.';
    if (!validateEmail(email))
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) {
      return;
    }

    // 암호화 적용 - SHA256 단방향 해시 적용
    const hashedPassword = SHA256(password).toString();
    console.log(id, hashedPassword);
    if (isEmailLogin === true) {
      alert('기능을 개발중입니다. 아이디로 로그인 해 주세요');
    }
    login(id, hashedPassword);
  };

  const errorClassName = 'text-red-500 text-xs mt-2';

  const handleGoogleLogin = async () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/v1/google/login`;

    // try {
    //   await googleLogin();
    //   // navigate('/fridges'); // 로그인 후 이동할 페이지 경로 설정
    // } catch (error) {
    //   console.error('Google login failed:', error);
    // }
  };

  return (
    <div id="signup-container">
      <div className="flex flex-col justify-center py-3 px-8 mt-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-left text-3xl font-normal">로그인</h2>
        </div>
      </div>
      <div className="py-8 ml-5 mr-5 px-4">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            {isEmailLogin ? (
              <>
                <label
                  htmlFor="email"
                  className="block text-sm mr-10 font-bold text-gray-700"
                >
                  이메일
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    required
                    placeholder="이메일을 입력해주세요."
                    className="appearance-none block w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className={errorClassName}>{errors.email}</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <label htmlFor="id" className="block text-sm mr-10 font-bold">
                  아이디
                </label>
                <div className="mt-1">
                  <input
                    id="id"
                    name="id"
                    type="text"
                    required
                    placeholder="아이디를 입력해주세요."
                    className="appearance-none block w-full h-12 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  {errors.id && <p className={errorClassName}>{errors.id}</p>}
                </div>
              </>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold">
              비밀번호
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="비밀번호를 입력해주세요."
                className="appearance-none block w-full px-3 h-12 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className={errorClassName}>{errors.password}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full h-12 flex justify-center items-center py-2 px-4 border rounded-full border-transparent text-md font-medium text-white bg-custom-yellow hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              로그인
            </button>
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full h-12 flex justify-center items-center py-2 px-4 border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-500 hover:bg-gray-100"
            >
              <img src={GoogleIcon} alt="Google" className="w-5 h-5 mr-2" />
              Google 계정으로 로그인
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="flex justify-between mx-6 my-8">
            {isEmailLogin ? (
              <button
                type="button"
                onClick={() => setIsEmailLogin(false)}
                className="text-sm font-medium  text-sky-600 hover:text-sky-500 underline"
              >
                아이디로 로그인
              </button>
            ) : (
              <button
                disabled
                type="button"
                onClick={() => setIsEmailLogin(true)}
                className="text-sm font-medium text-slate-400"
              >
                이메일로 로그인
              </button>
            )}
            <button
              disabled
              type="button"
              onClick={(e) => {
                e.preventDefault();
                // onForgotCredentials();
              }}
              className="text-sm font-medium  text-slate-400"
            >
              아이디/비밀번호 찾기
            </button>
          </div>

          <div className="mt-12 flex justify-center items-center space-x-2">
            <span className="text-sm text-gray-500">오늘 처음오셨나요?</span>
            <Link
              to="/signup"
              className="text-sm font-medium text-sky-600 hover:text-sky-500 underline"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
