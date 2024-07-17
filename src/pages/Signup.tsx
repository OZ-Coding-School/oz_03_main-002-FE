import { useState } from 'react';

interface SignupProps {
  title: string;
  userId: string;
  password: string;
  username: string;
  email: string;
}

const Signup: React.FC<SignupProps> = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputClassName =
    'appearance-none block w-full px-3 h-12 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg';

  return (
    <div className="min-h-screen bg-gray-100 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-left ml-8 text-3xl font-normal text-gray-900">
            회원가입
          </h2>
          <div className="flex w-full items-center gap-2.5 p-5 ">
            <div className="relative w-44 mt-[-1.00px] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
              사용자 정보를 입력해 주세요.
            </div>
            <div className="relative w-[147px] mt-[-1.00px] mr-[-2.00px] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[#4340f2] text-sm tracking-[0] leading-[normal] underline">
              로그인으로 돌아가기
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-8 ml-5 mr-5 px-4 shadow-2xl rounded-3xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm mr-10 font-bold text-gray-700"
            >
              아이디
            </label>
            <div className="mt-1">
              <input
                id="userId"
                name="userId"
                type="text"
                required
                placeholder="아이디를 입력해주세요."
                className={`${inputClassName}`}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700"
            >
              비밀번호
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="비밀번호를 입력해주세요."
                className={`${inputClassName}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700"
            >
              이름
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="이름을 입력해주세요."
                className={`${inputClassName}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>{' '}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700"
            >
              비밀번호
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="이메일을 입력해주세요."
                className={`${inputClassName}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full h-12 flex justify-center items-center py-2 px-4 border rounded-full border-transparent shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              로그인
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
    //   {/* Sign Up Page Header */}
    //   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    //     <h2 className="mt-6 text-left ml-8 text-3xl font-normal text-gray-900">
    //       회원가입
    //     </h2>

    //   </div>
    //   {/* Sign Up Page Header --End-- */}

    //   <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    //     <div className="bg-white py-8 ml-5 mr-5 px-4 shadow-2xl rounded-3xl">
    //       <form className="space-y-6" onSubmit={handleSubmit}>
    //         {/* 아이디 입력 field */}
    //         <div className="flex flex-col w-full items-start gap-[10px] px-2.5 py-0 relative flex-[0_0_auto]">
    //           <div className="flex items-start gap-1 pl-2 pr-4 pt-3.5 pb-0 relative self-stretch w-full flex-[0_0_auto]">
    //             <div className="inline-flex h-2 items-end justify-center gap-2.5 relative flex-[0_0_auto]">
    //               <div className="relative w-1 h-1 rounded-sm" />
    //             </div>
    //             <div className="relative flex-1 mt-[-1.00px] font-ios-subhead-2 font-[number:var(--ios-subhead-2-font-weight)] text-texttext-secondary text-[length:var(--ios-subhead-2-font-size)] tracking-[var(--ios-subhead-2-letter-spacing)] leading-[var(--ios-subhead-2-line-height)] [font-style:var(--ios-subhead-2-font-style)]">
    //               아이디
    //             </div>
    //           </div>
    //           <div className="flex h-8 items-start gap-3.5 pt-0 pb-2 px-4 relative self-stretch w-full">
    //             <div className="flex flex-wrap items-center gap-[0px_0px] relative flex-1 grow">
    //               <input
    //                 type="text"
    //                 value={userId}
    //                 onChange={(e) => setUserId(e.target?.value)}
    //                 placeholder="아이디를 입력해주세요."
    //                 className={`${inputClassName} placeholder:text-slate-700`}
    //                 required
    //               />
    //             </div>
    //           </div>
    //         </div>
    //         {/* 비밀번호 입력 field */}
    //         <div className="flex flex-col w-full items-start gap-[30px] px-2.5 py-0 relative flex-[0_0_auto] bg-backgroundbackground-primary">
    //           <div className="flex items-start gap-1 pl-2 pr-4 pt-3.5 pb-0 relative self-stretch w-full flex-[0_0_auto]">
    //             <div className="inline-flex h-2 items-end justify-center gap-2.5 relative flex-[0_0_auto]">
    //               <div className="relative w-1 h-1 rounded-sm" />
    //             </div>
    //             <div className="relative flex-1 mt-[-1.00px] font-ios-subhead-2 font-[number:var(--ios-subhead-2-font-weight)] text-texttext-secondary text-[length:var(--ios-subhead-2-font-size)] tracking-[var(--ios-subhead-2-letter-spacing)] leading-[var(--ios-subhead-2-line-height)] [font-style:var(--ios-subhead-2-font-style)]">
    //               비밀번호
    //             </div>
    //           </div>
    //           <div className="flex h-8 items-start gap-3.5 pt-0 pb-2 px-4 relative self-stretch w-full">
    //             <div className="flex flex-wrap items-center gap-[0px_0px] relative flex-1 grow">
    //               <input
    //                 type="text"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target?.value)}
    //                 placeholder="비밀번호를 입력해주세요."
    //                 className={`${inputClassName} placeholder:text-slate-700`}
    //                 required
    //               />
    //             </div>
    //           </div>
    //         </div>
    //         {/* 이름 입력 field */}
    //         <div className="flex flex-col w-full items-start gap-[30px] px-2.5 py-0 relative flex-[0_0_auto] bg-backgroundbackground-primary">
    //           <div className="flex items-start gap-1 pl-2 pr-4 pt-3.5 pb-0 relative self-stretch w-full flex-[0_0_auto]">
    //             <div className="inline-flex h-2 items-end justify-center gap-2.5 relative flex-[0_0_auto]">
    //               <div className="relative w-1 h-1 rounded-sm" />
    //             </div>
    //             <div className="relative flex-1 mt-[-1.00px] font-ios-subhead-2 font-[number:var(--ios-subhead-2-font-weight)] text-texttext-secondary text-[length:var(--ios-subhead-2-font-size)] tracking-[var(--ios-subhead-2-letter-spacing)] leading-[var(--ios-subhead-2-line-height)] [font-style:var(--ios-subhead-2-font-style)]">
    //               이름
    //             </div>
    //           </div>
    //           <div className="flex h-8 items-start gap-3.5 pt-0 pb-2 px-4 relative self-stretch w-full">
    //             <div className="flex flex-wrap items-center gap-[0px_0px] relative flex-1 grow">
    //               <input
    //                 type="text"
    //                 value={username}
    //                 onChange={(e) => setUsername(e.target?.value)}
    //                 placeholder="이름을 입력해주세요"
    //                 className={`${inputClassName} placeholder:text-slate-700`}
    //                 required
    //               />
    //             </div>
    //           </div>
    //         </div>
    //         {/* 이메일 입력 field */}
    //         <div className="flex flex-col w-full items-start gap-[30px] px-2.5 py-0 relative flex-[0_0_auto] bg-backgroundbackground-primary">
    //           <div className="flex items-start gap-1 pl-2 pr-4 pt-3.5 pb-0 relative self-stretch w-full flex-[0_0_auto]">
    //             <div className="inline-flex h-2 items-end justify-center gap-2.5 relative flex-[0_0_auto]">
    //               <div className="relative w-1 h-1 rounded-sm" />
    //             </div>
    //             <div className="relative flex-1 mt-[-1.00px] font-ios-subhead-2 font-[number:var(--ios-subhead-2-font-weight)] text-texttext-secondary text-[length:var(--ios-subhead-2-font-size)] tracking-[var(--ios-subhead-2-letter-spacing)] leading-[var(--ios-subhead-2-line-height)] [font-style:var(--ios-subhead-2-font-style)]">
    //               이메일
    //             </div>
    //           </div>
    //           <div className="flex h-8 items-start gap-3.5 pt-0 pb-2 px-4 relative self-stretch w-full">
    //             <div className="flex flex-wrap items-center gap-[0px_0px] relative flex-1 grow">
    //               <input
    //                 type="text"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target?.value)}
    //                 className={`${inputClassName} placeholder:text-slate-700`}
    //                 placeholder="이메일을 입력해주세요"
    //                 required
    //               />
    //             </div>
    //           </div>
    //           <div className="!self-stretch !h-[60px] !rounded-[100px] !px-2.5 !py-0 !flex !bg-[#ff9b9b] !w-full">
    //             <button className="!self-stretch">회원가입</button>
    //           </div>
    //         </div>
    //       </form>{' '}
    //     </div>{' '}
    //   </div>
    // </div>
  );
};

export default Signup;
