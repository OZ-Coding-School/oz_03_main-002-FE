import { useEffect, useState } from 'react';
import FridgeItem from './FridgeItem.tsx';
import useFridgeStore from '../store/useFridgeStore';
import { Refrigerator } from '../types/fridgeType';
import PopupModal from './common/PopupModal.tsx';
// import fridgeData from '../data/fridgeData.ts';

function FridgeList() {
  const fridges = useFridgeStore((state) => state.fridges);
  const showModal = useFridgeStore((state) => state.showModal);
  const setShowModal = useFridgeStore((state) => state.setShowModal);
  const currentMode = useFridgeStore((state) => state.currentMode);
  const setCurrentMode = useFridgeStore((state) => state.setCurrentMode);
  const fetchFridges = useFridgeStore((state) => state.fetchFridges);
  const addFridge = useFridgeStore((state) => state.addFridge);
  const updateFridge = useFridgeStore((state) => state.updateFridge);
  const deleteFridge = useFridgeStore((state) => state.deleteFridge);

  const [selectedFridge, setSelectedFridge] = useState<Refrigerator | null>(
    null,
  );

  // 더미 테이터를 local storage에 임시로 저장하는 코드 (import 문과 함께 주석처리 됨)
  // const test = () => {
  //   const dataSave = localStorage.setItem(
  //     'fridges',
  //     JSON.stringify(fridgeData),
  //   );
  //   return console.log(`first ${dataSave}`);
  // };
  // test();

  useEffect(() => {
    fetchFridges();
  }, [fetchFridges]);

  const handleAddClick = () => {
    setCurrentMode('add');
    setSelectedFridge(null);
    setShowModal(true);
  };

  const handleEditClick = (fridge: Refrigerator) => {
    setCurrentMode('edit');
    setSelectedFridge(fridge);
    setShowModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setCurrentMode('delete');
    setShowModal(true);
    deleteFridge(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentMode('');
    setSelectedFridge(null);
  };

  const handleSubmit = (data: Omit<Refrigerator, 'id'>) => {
    if (currentMode === 'add') {
      addFridge(data);
    } else if (currentMode === 'edit' && selectedFridge) {
      updateFridge(selectedFridge.id, data);
    } else if (currentMode === 'delete' && selectedFridge) {
      deleteFridge(selectedFridge.id);
    }
    handleCloseModal();
  };

  if (!fridges) return null;

  // 냉장고 스타일 정의
  const fridgeStyle =
    'w-full rounded-2xl bg-[#f8f8f8] shadow-[0_4px_8px_-2px_rgba(0,0,0,0.3)] ';

  return (
    <div
      id="fridge-container" // 냉장고 목록 전체를 감싸는 컨테이너
      className="h-[800px] sm:h-[800px] md:h-[800px] w-full sm:w-full md:w-[360px] bg-white shadow-2xl rounded-3xl mt-2 mx-auto min-w-[360px] overflow-hidden"
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
        className="w-full px-5 flex flex-col gap-5 pt-5 pb-3 overflow-auto scroll-smooth  scroll_custom relative"
        style={{ height: 'calc(100% - 80px)' }} // 동적 높이 계산
      >
        {/* 각 냉장고 아이템을 반복문을 통해 렌더링 */}
        {fridges.map((fridge) => (
          <div key={fridge.id} className={`${fridgeStyle}`}>
            <FridgeItem
              key={`fridge-item-${fridge.id}`}
              item={fridge}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
        ))}
        {/* 냉장고 추가 버튼 */}
        <div
          className={`${fridgeStyle} text-2xl min-h-[210px] flex items-center justify-center`}
        >
          <button
            type="button"
            onClick={handleAddClick}
            className="w-full h-full"
          >
            &#43;
          </button>{' '}
          {showModal && (
            <PopupModal
              // item={item}
              mode={currentMode}
              onClose={handleCloseModal}
              onSubmit={handleSubmit}
              existingData={selectedFridge || undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FridgeList;
