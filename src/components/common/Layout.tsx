import { Outlet } from 'react-router';
import GlobalHeader from './GlobalHeader.tsx';

function Layout() {
  return (
    <div
      className=" bg-gray-100 flex flex-col justify-center "
      style={{ height: 'calc(100vh - 76px)' }} // TODO 해당 높이는 추후 App.tsx 파일 내 header코드 제거시에 수정 예정
    >
      <div className="relative h-dvh sm:h-[800px] md:h-[800px] w-full sm:w-full md:w-[360px] bg-white shadow-2xl sm:rounded-3xl md:rounded-3xl mx-auto min-w-[360px] overflow-hidden">
        <GlobalHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
