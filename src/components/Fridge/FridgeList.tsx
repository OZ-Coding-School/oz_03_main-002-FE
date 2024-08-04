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
  const fridgeStyle = 'w-full rounded-2xl bg-[#f8f8f8] shadow-lg';

  return (
    <div id="fridge-container">
      {/* 서브 헤더 */}
      <div
        id="fridges-header" // 냉장고 목록의 헤더
        className="w-full h-10 bg-gray-100 text-sm text-center flex"
      >
        <p className="m-auto">나의 냉장고 목록</p> {/* 헤더 텍스트 */}
      </div>
      {/* 서브 헤더 종료 */}
      {/* 본문 */}
      <div
        id="fridge-list" // 냉장고 리스트 컨테이너
        className="w-full h-[690px] px-5 flex flex-col gap-5 pt-5 pb-3 overflow-scroll scroll-smooth scroll_custom relative"
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
          className={`${fridgeStyle} min-h-[210px] flex items-center justify-center`}
        >
          <button
            type="button"
            onClick={handleAddClick}
            className="text-2xl w-full h-full"
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
