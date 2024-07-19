import React, { useState } from 'react';
import FridgeItem from './FridgeItem.tsx';
import fridgeData from '../data/fridgeData';
import { BtnType, FridgeMode, Refrigerator } from './types/fridgeType.ts';
import PopupModal from './common/PopupModal.tsx';

function FridgeList() {
  const [fridges, setFridges] = useState(fridgeData);
  const [showModal, setShowModal] = useState(false);
  const [currentMode, setCurrentMode] = useState<FridgeMode>('add');
  const [btnMode, setBtnMode] = useState<BtnType>('add');

  const handleAddFridgeClick = () => {
    console.log('Add Fridge button clicked'); // 콘솔 로그 추가
    setShowModal(true);
    setCurrentMode(currentMode);
  };

  const handleCloseModal = () => {
    console.log('Close Modal button clicked'); // 콘솔 로그 추가
    setShowModal(false);
  };

  const handleModeChange = (mode: FridgeMode) => {
    setCurrentMode(mode);
  };

  // 냉장고 스타일 정의
  const fridgeStyle =
    'w-full rounded-2xl bg-[#f8f8f8] shadow-[0_4px_8px_-2px_rgba(0,0,0,0.3)] ';

  return (
    <div
      id="fridge-container" // 냉장고 목록 전체를 감싸는 컨테이너
      className="h-[360px] sm:h-[100vh] md:h-[360px] w-full sm:w-full md:w-[360px] bg-white shadow-2xl rounded-3xl mt-2 mx-auto min-w-[360px] overflow-hidden"
      style={{ height: 'calc(100vh - 140px)' }} // 동적 높이 계산
    >
      {/* 상단 헤더: 글로벌 헤더가 추후 추가될 예정 */}
      <div
        id="fridges-header" // 냉장고 목록의 헤더
        className="w-full h-[60px] border-b-2 border-slate-500/30 shadow-md text-center flex "
      >
        <p className="m-auto">나의 냉장고 목록</p> {/* 헤더 텍스트 */}
      </div>
      <div
        id="fridge-list" // 냉장고 리스트 컨테이너
        className="w-full px-5 flex flex-col gap-5 pt-5 pb-3 overflow-auto scroll-smooth scroll_custom relative"
        style={{ height: 'calc(100% - 50px)' }} // 동적 높이 계산
      >
        {/* 각 냉장고 아이템을 반복문을 통해 렌더링 */}
        {fridges.map((item: Refrigerator) => (
          <div key={item.create_at} className={`${fridgeStyle}`}>
            <FridgeItem key={item.id} item={item} />{' '}
            {/* FridgeItem 컴포넌트를 통해 냉장고 아이템 렌더링 */}
          </div>
        ))}
        {/* 냉장고 추가 버튼 */}
        <div
          className={`${fridgeStyle} text-2xl min-h-[210px] flex items-center justify-center mb-5`}
        >
          <button
            type="button"
            onClick={handleAddFridgeClick}
            className="w-full h-full"
          >
            &#43;
          </button>{' '}
          {showModal && (
            <PopupModal
              mode={currentMode}
              onClose={handleCloseModal}
              onModeChange={handleModeChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FridgeList;
