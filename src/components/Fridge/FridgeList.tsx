import { useEffect, useState } from 'react';
import FridgeItem from './FridgeItem.tsx';
import useFridgeStore from '../../store/useFridgeStore';
import { Refrigerator } from '../../types/fridgeType';
import AddFridgeModal from './modals/AddFridgeModal.tsx';

function FridgeList() {
  const fridges = useFridgeStore((state) => state.fridges);
  const fetchFridges = useFridgeStore((state) => state.fetchFridges);
  const addFridge = useFridgeStore((state) => state.addFridge);

  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchFridges();
  }, [fetchFridges]);

  const handleAddFridge = (data: { fridgeName: string }) => {
    addFridge(data);
    setShowAddModal(false);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };
  const handleAddClick = () => {
    setShowAddModal(true);
  };

  if (!fridges) return null;

  // 냉장고 스타일 정의
  const fridgeStyle =
    'w-full rounded-2xl bg-[#f8f8f8] shadow-[0_4px_8px_-2px_rgba(0,0,0,0.3)] ';

    if (!fridges) return null;

  return (
    <div id="fridge-container">
      {/* 서브 헤더 */}
      <div
        id="fridges-header"
        className="w-full h-[50px] bg-slate-100 text-center flex "
      >
        <p className="m-auto">나의 냉장고 목록</p> {/* 헤더 텍스트 */}
      </div>
      {/* 서브 헤더 종료 */}
      {/* 본문 */}
      <div
        id="fridge-list"
        className="w-full flex flex-col flex-1 gap-5 py-5 pl-5 pr-3 overflow-auto scroll-smooth relative scroll_custom
          sm:h-[calc(800px-49px-50px)] md:h-[calc(800px-49px-50px)] 
          h-[calc(100vh-76px-49px-50px)]"
      >
        {/* 각 냉장고 아이템을 반복문을 통해 렌더링 */}
        {Array.isArray(fridges) &&
          fridges.map((fridge: Refrigerator) => (
            <div key={fridge.id} className={`${fridgeStyle}`}>
              <FridgeItem key={`fridge-item-${fridge.id}`} item={fridge} />
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
            +
          </button>
          {showAddModal && (
            <AddFridgeModal
              onSubmit={handleAddFridge}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </div>
      {/* 본문 종료 */}
    </div>
  );
}

export default FridgeList;
