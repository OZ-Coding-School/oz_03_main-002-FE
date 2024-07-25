import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiCloseLine,
  RiCheckLine,
  RiSubtractLine,
  RiAddLine,
  RiSearchLine,
} from 'react-icons/ri';
import InfiniteScroll from 'react-infinite-scroll-component';
import fridgeIngredientData from '../data/fridgeIngredientData.json';

// Ingredient 인터페이스 정의
interface Ingredient {
  id: number;
  originName: string;
  category: string;
  mdCategory?: string;
  sbCategory?: string;
}

// FridgeIngredient 인터페이스 정의
interface FridgeIngredient {
  fridgeId: number;
  id: number;
  fridgeIngreName: string;
  ingredient: Ingredient;
  createdDate: string;
  expirationDate: string;
  quantity: number;
  weight?: number;
  memo?: string;
}

// SelectedIngredient 인터페이스 정의 (Ingredient에 quantity와 날짜 필드 추가)
interface SelectedIngredient extends Ingredient {
  quantity: number;
  createdDate: string;
  expirationDate: string;
}

// BottomSheetProps 인터페이스 정의 (BottomSheet 컴포넌트의 prop 정의)
interface BottomSheetProps {
  isOpen: boolean; // BottomSheet의 열림 상태
  onClose: () => void; // BottomSheet 닫기 함수
  onAddMultiple: (selectedIngredients: SelectedIngredient[]) => void; // 선택된 재료 추가 함수
}

// 선택된 재료 항목을 나타내는 컴포넌트
function SelectedIngredientItem({
  ingredient,
  onRemove,
}: {
  ingredient: SelectedIngredient; // SelectedIngredient 타입의 재료
  onRemove: (ingredient: SelectedIngredient) => void; // 재료 제거 함수
}) {
  return (
    <motion.div
      key={ingredient.id}
      className="bg-sky-100 rounded-full py-1 px-3 flex items-center cursor-pointer mb-2"
      initial={{ opacity: 0, scale: 0.8 }} // 초기 애니메이션 상태
      animate={{ opacity: 1, scale: 1 }} // 애니메이션 상태
      exit={{ opacity: 0, scale: 0.8 }} // 종료 애니메이션 상태
      transition={{ duration: 0.2 }} // 애니메이션 지속 시간
      onClick={() => onRemove(ingredient)} // 클릭 시 재료 제거
    >
      <span className="text-sm mr-1">{ingredient.originName}</span>
      <span className="text-sm mx-1">{ingredient.quantity}</span>
      <RiCloseLine className="text-sky-500 ml-1" size={16} />
    </motion.div>
  );
}

// 재료 항목을 나타내는 컴포넌트
function IngredientItem({
  ingredient,
  isSelected,
  quantity,
  onToggle,
  onUpdateQuantity,
}: {
  ingredient: Ingredient; // Ingredient 타입의 재료
  isSelected: boolean; // 재료 선택 여부
  quantity: number; // 재료 수량
  onToggle: (ingredient: Ingredient) => void; // 재료 선택/해제 함수
  onUpdateQuantity: (id: number, newQuantity: number) => void; // 재료 수량 업데이트 함수
}) {
  return (
    <motion.div
      className={`flex items-center py-2 px-2 rounded-lg cursor-pointer mb-3 ${
        isSelected ? 'bg-sky-100' : 'bg-gray-50 hover:bg-gray-100'
      }`}
      initial={{ opacity: 0, y: 20 }} // 초기 애니메이션 상태
      animate={{ opacity: 1, y: 0 }} // 애니메이션 상태
      exit={{ opacity: 0, y: 20 }} // 종료 애니메이션 상태
      transition={{ duration: 0.2 }} // 애니메이션 지속 시간
      onClick={() => onToggle(ingredient)} // 클릭 시 재료 선택/해제
    >
      <div className="flex-grow flex items-center">
        {isSelected ? (
          <RiCheckLine className="text-sky-500 mr-2" size={20} />
        ) : (
          <div className="w-5 h-5 mr-2" />
        )}
        <span className="font-semibold text-sm">{ingredient.originName}</span>
      </div>
      {isSelected && (
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }} // button-hover: 크기 증가
            whileTap={{ scale: 0.9 }} // button-click: 크기 감소
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 전파 방지
              onUpdateQuantity(ingredient.id, quantity - 1); // 수량 감소
            }}
            // -1 스타일 속성 정의
            className="mr-2 text-sky-500 px-1 rounded-lg"
          >
            <RiSubtractLine size={25} />
          </motion.button>
          <span className="text-sm mx-2">{quantity}</span>
          <motion.button
            whileHover={{ scale: 1.1 }} // button-hover: 크기 증가
            whileTap={{ scale: 0.9 }} // button-click 크기 감소
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 전파 방지
              onUpdateQuantity(ingredient.id, quantity + 1); // 수량 증가
            }}
            // +1 스타일 속성 정의
            className="ml-2 text-blue-500 px-1 rounded-lg"
          >
            <RiAddLine size={25} />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

// BottomSheet 컴포넌트
function BottomSheet({ isOpen, onClose, onAddMultiple }: BottomSheetProps) {
  // 상태 변수 선언
  const [selectedIngredients, setSelectedIngredients] = useState<
    SelectedIngredient[]
  >([]);
  const [visibleIngredients, setVisibleIngredients] = useState<Ingredient[]>(
    [],
  );
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [error, setError] = useState<string | null>(null); // 오류 메시지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [isClosing, setIsClosing] = useState(false); // 닫기 애니메이션 상태

  // 유니크한 재료 목록 생성
  const uniqueIngredients = useMemo(() => {
    const uniqueMap = new Map<number, Ingredient>();
    fridgeIngredientData.forEach((item: FridgeIngredient) => {
      if (!uniqueMap.has(item.ingredient.id))
        uniqueMap.set(item.ingredient.id, item.ingredient);
    });
    return Array.from(uniqueMap.values());
  }, []);

  // 검색어에 따라 필터링된 재료 목록 생성
  const filteredIngredients = useMemo(() => {
    return uniqueIngredients.filter((ing) =>
      ing.originName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [uniqueIngredients, searchTerm]);

  // 더 많은 재료를 가져오는 함수
  const fetchMoreData = useCallback(() => {
    if (isLoading) return; // 로딩 중이면 반환
    setIsLoading(true);
    const currentLength = visibleIngredients.length;
    const nextIngredients = filteredIngredients.slice(
      currentLength,
      currentLength + 10,
    );
    setTimeout(() => {
      setVisibleIngredients((prev) => [...prev, ...nextIngredients]);
      setIsLoading(false);
    }, 1000);
  }, [filteredIngredients, visibleIngredients.length, isLoading]);

  // 필터링된 재료가 변경되면 visibleIngredients 상태 업데이트
  useEffect(() => {
    try {
      setVisibleIngredients(filteredIngredients.slice(0, 10));
      setError(null); // 오류 초기화
    } catch (err) {
      setError('재료를 불러오는 중 오류가 발생했습니다.'); // 오류 메시지 설정
    }
  }, [filteredIngredients]);

  // 재료 선택/해제 처리 함수
  const toggleIngredientSelection = useCallback((ingredient: Ingredient) => {
    setSelectedIngredients((prevSelected) => {
      const existingIndex = prevSelected.findIndex(
        (item) => item.id === ingredient.id,
      );
      if (existingIndex !== -1) {
        return prevSelected.filter((item) => item.id !== ingredient.id);
      }
      // 새로 선택된 재료 추가
      const now = new Date();
      const expirationDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
      return [
        ...prevSelected,
        {
          ...ingredient,
          quantity: 1,
          createdDate: now.toISOString(),
          expirationDate: expirationDate.toISOString(),
        },
      ];
    });
  }, []);

  // 재료 수량 업데이트 함수
  const updateIngredientQuantity = useCallback(
    (id: number, newQuantity: number) => {
      if (newQuantity < 1) return; // 수량이 1보다 작으면 반환
      setSelectedIngredients((prevSelected) =>
        prevSelected.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        ),
      );
    },
    [],
  );

  // 선택된 재료를 추가하고 BottomSheet을 닫는 함수
  const handleAddSelectedIngredients = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onAddMultiple(selectedIngredients); // 선택된 재료 추가
      setSelectedIngredients([]); // 선택된 재료 초기화
      onClose(); // BottomSheet 닫기
      setIsClosing(false);
    }, 300);
  }, [onAddMultiple, selectedIngredients, onClose]);

  // BottomSheet을 닫는 함수
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(); // BottomSheet 닫기
      setIsClosing(false);
    }, 300);
  }, [onClose]);

  if (!isOpen) return null; // BottomSheet이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }} // 애니메이션 시작 상태
        animate={{ y: isClosing ? '100%' : 0 }} // 애니메이션 중 상태
        exit={{ y: '100%' }} // 애니메이션 종료 상태
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
          mass: 0.8,
        }}
        drag="y" // 수직 드래그 가능
        dragConstraints={{ top: 0 }} // 드래그 범위 설정
        dragElastic={0.05} // 드래그 탄성 설정
        onDragEnd={(_, info) => {
          // 드래그 종료 시 처리
          if (info.offset.y > 100 || info.velocity.y > 500) handleClose();
        }}
        className="fixed bottom-0 left-0 right-0 bg-white border-x-2 border-y-2 border-b-0 border-gray-500 shadow-2xl rounded-t-2xl max-w-md mx-auto h-[55vh] overflow-hidden flex flex-col"
        style={{ boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)' }}
        role="dialog"
      >
        <div className="w-14 h-1 bg-gray-300 rounded-full mx-auto my-3" />
        <div className="p-4 flex-1 flex flex-col overflow-hidden">
          <h3 id="bottomSheetTitle" className="text-xl font-bold mb-4">
            재료 목록
          </h3>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="재료명을 입력해 검색해보세요."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <RiSearchLine
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
              aria-hidden="true"
            />
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <AnimatePresence>
            {selectedIngredients.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 overflow-hidden"
              >
                <h4 className="text-sm font-semibold mb-2">
                  선택된 재료 ({selectedIngredients.length}개)
                </h4>
                <div className="overflow-x-auto whitespace-nowrap">
                  <div className="inline-flex gap-2">
                    <AnimatePresence>
                      {selectedIngredients.map((ing) => (
                        <SelectedIngredientItem
                          key={ing.id}
                          ingredient={ing}
                          onRemove={toggleIngredientSelection}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex-1 overflow-y-auto space-y-4" id="scrollableDiv">
            <InfiniteScroll
              dataLength={visibleIngredients.length} // 현재 로드된 재료의 길이
              next={fetchMoreData} // 추가 데이터를 가져오는 함수
              hasMore={filteredIngredients.length > visibleIngredients.length} // 더 많은 데이터가 있는지 여부
              loader={
                <div className="text-center py-2 text-gray-500">
                  재료정보를 가져오고 있습니다. 잠시 기다려주세요.
                </div>
              }
              endMessage={
                <div className="text-center py-2 text-gray-500">
                  더 이상 불러올 재료가 없습니다.
                </div>
              }
              scrollableTarget="scrollableDiv" // infinity scroll을 위한 div
              scrollThreshold={0.9} // scroll trigger 비율 (90%)
            >
              <AnimatePresence>
                {visibleIngredients.map((ing) => (
                  <IngredientItem
                    key={ing.id}
                    ingredient={ing}
                    isSelected={selectedIngredients.some(
                      (item) => item.id === ing.id,
                    )}
                    quantity={
                      selectedIngredients.find((item) => item.id === ing.id)
                        ?.quantity || 1
                    }
                    onToggle={toggleIngredientSelection}
                    onUpdateQuantity={updateIngredientQuantity}
                  />
                ))}
              </AnimatePresence>
            </InfiniteScroll>
          </div>
        </div>
        <AnimatePresence>
          {selectedIngredients.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="p-4 bg-white border-t border-gray-200"
            >
              <button
                type="button"
                className="w-full h-12 bg-pink-500 text-white rounded-lg py-2 px-4 text-sm font-semibold hover:bg-pink-600 active:bg-pink-700 transition duration-150 ease-in-out shadow-md"
                onClick={handleAddSelectedIngredients} // 선택된 재료 추가 버튼 클릭 시 처리
              >
                총 {selectedIngredients.length}개의 재료 추가하기
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

export default BottomSheet;
