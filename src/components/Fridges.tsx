interface SignupProps {
  title: string;
}

const Fridges: React.FC<SignupProps> = () => {
  return (
    <div
      className="h-[100vh] sm:h-[100vh] md:h-auto w-full sm:w-full md:w-[360px] bg-white shadow-2xl rounded-3xl mt-2 mx-auto min-w-[360px]"
      style={{ height: 'calc(100vh - 140px)' }}
    >
      <div>냉장고1</div>
      <div>냉장고2</div>
    </div>
  );
};

export default Fridges;
