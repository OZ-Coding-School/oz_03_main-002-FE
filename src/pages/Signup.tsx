interface SignupProps {
	title: string;
  style: string | React.CSSProperties | undefined;
}

const Signup: React.FC<SignupProps> = () => {
  return (

  <div className="inline-flex flex-col h-[100vh-60px] w-full items-start gap-2.5 px-[5px] py-0 relative rounded-[20px] overflow-hidden">
    <div className="relative self-stretch w-full h-[100px] overflow-hidden">
      <div className="absolute w-[147px] h-[43px] top-[15px] left-[22px] [font-family:'SF_Pro_Text-Semibold',Helvetica] font-normal text-black text-4xl tracking-[0] leading-[normal]">
        회원가입
      </div>
      <div className="flex w-[371px] items-center gap-2.5 px-5 py-0 absolute top-[68px] left-0.5">
        <div className="relative w-44 mt-[-1.00px] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
          사용자 정보를 입력해 주세요.
        </div>
        <div className="relative w-[147px] mt-[-1.00px] mr-[-2.00px] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[#4340f2] text-sm tracking-[0] leading-[normal] underline">
          로그인으로 돌아가기
        </div>
      </div>
    </div>
    {/* 아이디 입력 field */}
    <div className="flex flex-col w-full items-start gap-[10px] px-2.5 py-0 relative flex-[0_0_auto]">
      <div className="flex items-start gap-1 pl-2 pr-4 pt-3.5 pb-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="inline-flex h-2 items-end justify-center gap-2.5 relative flex-[0_0_auto]">
          <div className="relative w-1 h-1 rounded-sm" />
        </div>
        <div className="relative flex-1 mt-[-1.00px] font-ios-subhead-2 font-[number:var(--ios-subhead-2-font-weight)] text-texttext-secondary text-[length:var(--ios-subhead-2-font-size)] tracking-[var(--ios-subhead-2-letter-spacing)] leading-[var(--ios-subhead-2-line-height)] [font-style:var(--ios-subhead-2-font-style)]">
          아이디
        </div>
      </div>
      <div className="flex h-8 items-start gap-3.5 pt-0 pb-2 px-4 relative self-stretch w-full">
        <div className="flex flex-wrap items-center gap-[0px_0px] relative flex-1 grow">
          <input type="text" className="relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[#dddddd] text-xl tracking-[0] leading-[21px] whitespace-nowrap" placeholder='아이디를 입력해주세요.'/>
        </div>
      </div>
    </div>
    {/* 비밀번호 입력 field */}
    <div className="flex flex-col w-full items-start gap-[30px] px-2.5 py-0 relative flex-[0_0_auto] bg-backgroundbackground-primary">
      <div className="flex items-start gap-1 pl-2 pr-4 pt-3.5 pb-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="inline-flex h-2 items-end justify-center gap-2.5 relative flex-[0_0_auto]">
          <div className="relative w-1 h-1 rounded-sm" />
        </div>
        <div className="relative flex-1 mt-[-1.00px] font-ios-subhead-2 font-[number:var(--ios-subhead-2-font-weight)] text-texttext-secondary text-[length:var(--ios-subhead-2-font-size)] tracking-[var(--ios-subhead-2-letter-spacing)] leading-[var(--ios-subhead-2-line-height)] [font-style:var(--ios-subhead-2-font-style)]">
          비밀번호
        </div>
      </div>
      <div className="flex h-8 items-start gap-3.5 pt-0 pb-2 px-4 relative self-stretch w-full">
        <div className="flex flex-wrap items-center gap-[0px_0px] relative flex-1 grow">
          <input type="text" placeholder='비밀번호를 입력해주세요.' className="relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[#dddddd] text-xl tracking-[0] leading-[21px] whitespace-nowrap"/>
        </div>
      </div>
    </div>
    {/* 이름 입력 field */}
    <div className="flex flex-col w-full items-start gap-[30px] px-2.5 py-0 relative flex-[0_0_auto] bg-backgroundbackground-primary">
      <div className="flex items-start gap-1 pl-2 pr-4 pt-3.5 pb-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="inline-flex h-2 items-end justify-center gap-2.5 relative flex-[0_0_auto]">
          <div className="relative w-1 h-1 rounded-sm" />
        </div>
        <div className="relative flex-1 mt-[-1.00px] font-ios-subhead-2 font-[number:var(--ios-subhead-2-font-weight)] text-texttext-secondary text-[length:var(--ios-subhead-2-font-size)] tracking-[var(--ios-subhead-2-letter-spacing)] leading-[var(--ios-subhead-2-line-height)] [font-style:var(--ios-subhead-2-font-style)]">
          이름
        </div>
      </div>
      <div className="flex h-8 items-start gap-3.5 pt-0 pb-2 px-4 relative self-stretch w-full">
        <div className="flex flex-wrap items-center gap-[0px_0px] relative flex-1 grow">

          <input type="text" placeholder='이름을 입력해주세요' className="relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[#dddddd] text-xl tracking-[0] leading-[21px] whitespace-nowrap"/>
        </div>
      </div>
    </div>
    {/* 이메일 입력 field */}
    <div className="flex flex-col w-full items-start gap-[30px] px-2.5 py-0 relative flex-[0_0_auto] bg-backgroundbackground-primary">
      <div className="flex items-start gap-1 pl-2 pr-4 pt-3.5 pb-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="inline-flex h-2 items-end justify-center gap-2.5 relative flex-[0_0_auto]">
          <div className="relative w-1 h-1 rounded-sm" />
        </div>
        <div className="relative flex-1 mt-[-1.00px] font-ios-subhead-2 font-[number:var(--ios-subhead-2-font-weight)] text-texttext-secondary text-[length:var(--ios-subhead-2-font-size)] tracking-[var(--ios-subhead-2-letter-spacing)] leading-[var(--ios-subhead-2-line-height)] [font-style:var(--ios-subhead-2-font-style)]">
          이메일
        </div>
      </div>
      <div className="flex h-8 items-start gap-3.5 pt-0 pb-2 px-4 relative self-stretch w-full">
        <div className="flex flex-wrap items-center gap-[0px_0px] relative flex-1 grow">
          <input type="text" placeholder='이메일을 입력해주세요' className="relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[#dddddd] text-xl tracking-[0] leading-[21px] whitespace-nowrap"/>
        </div>
      </div>
      <div className="!self-stretch !h-[60px] !rounded-[100px] !px-2.5 !py-0 !flex !bg-[#ff9b9b] !w-full">

     <button className='!self-stretch'>회원가입</button>
      </div>
  </div>
  </div>
    )
}

export default Signup