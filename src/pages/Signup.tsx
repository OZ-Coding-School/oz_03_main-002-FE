import React, { useState } from 'react';
import { SHA256 } from 'crypto-js';
import { v4 as uuid } from 'uuid';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

function Signup() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const signup = useAuthStore((state) => state.signUp);

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
  const validateUsername = (name: string) => /^[가-힣]{2,5}$/.test(name);
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
    if (!validateUsername(username))
      newErrors.username =
        '이름은 최소 2자 이상 5자 이하, 한글만 입력 가능합니다.';
    if (!validateEmail(email))
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  // 비밀번호 보기 & 숨기기
  const [hidePassword, setHidePassword] = useState(true);
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!handleValidation()) {
      return;
    }

    // 로그인 암호화 적용 - salt
    const salt = uuid(); // 고유한 salt 생성
    // 암호화 적용 - SHA256 단방향 해시 적용
    const hashedPassword = SHA256(password).toString();
    const saltedPassword: string = SHA256(hashedPassword + salt).toString();
    signup(id, username, email, saltedPassword, salt);
  };

  // 공통 Tailwind CSS 클래스명 변수로 추출
  const inputClassName =
    'appearance-none block w-full px-3 h-12 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg';
  const labelClassName = 'block text-sm font-bold text-gray-700';
  const errorClassName = 'text-red-500 text-xs mt-2';

  return (
    <div
      className="h-[100vh] sm:h-[100vh] md:h-auto w-full sm:w-full md:w-[360px] bg-white shadow-2xl rounded-3xl mt-2 mx-auto min-w-[360px]"
      style={{ height: 'calc(100vh - 140px)' }}
    >
      <div className="flex flex-col justify-center py-3 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-left text-3xl font-normal text-gray-900">
            회원가입
          </h2>
          <div className="flex w-full items-center py-2 gap-2.5">
            <div className="relative w-44 [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
              정보를 입력해 주세요.
            </div>
            <Link
              to="/login"
              className="relative w-[147px] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[#4340f2] text-sm tracking-[0] leading-[normal] underline"
            >
              로그인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
      <div className="py-8 ml-5 mr-5 px-4">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userId" className={labelClassName}>
              아이디
            </label>
            <div className="mt-1">
              <input
                id="userId"
                name="userId"
                type="text"
                required
                placeholder="아이디를 입력해주세요."
                className={inputClassName}
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              {errors.id && <p className={errorClassName}>{errors.id}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="password" className={labelClassName}>
              비밀번호
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={hidePassword ? 'password' : 'text'}
                required
                placeholder="비밀번호를 입력해주세요."
                className={inputClassName}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-3.5 right-4 text-xl text-slate-700"
                onClick={toggleHidePassword}
              >
                {hidePassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
              {errors.password && (
                <p className={errorClassName}>{errors.password}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="username" className={labelClassName}>
              이름
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="이름을 입력해주세요."
                className={inputClassName}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <p className={errorClassName}>{errors.username}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="email" className={labelClassName}>
              이메일
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="이메일을 입력해주세요."
                className={inputClassName}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className={errorClassName}>{errors.email}</p>}
            </div>
          </div>
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full h-12 flex justify-center items-center py-2 px-4 border rounded-full border-transparent shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
