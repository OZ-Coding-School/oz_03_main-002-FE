import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  RiAddLine,
  RiDeleteBinLine,
  RiCheckboxMultipleFill,
  RiCheckboxMultipleBlankLine,
  RiCloseLine,
  RiArrowRightSLine,
} from 'react-icons/ri';
import BottomSheet from '../components/BottomSheet.tsx';
import BulkDeleteModal from '../components/BulkDeleteModal.tsx';
import fridgeIngredientData from '../data/fridgeIngredientData.json';

// Ingredient 인터페이스 정의
interface Ingredient {
  id: number;
  originName: string;
  category: string;
  mdCategory?: string;
  sbCategory?: string;
}

// FridgeIngredient 인터페이스 정의 - (재료와 관련된 추가 정보 포함)
interface FridgeIngredient {
  fridgeId: number;
  id: number;
  fridgeIngreName: string;
  ingredient: Ingredient;
  createdDate: string;
  expirationDate: string;
  quantity: number;
  weight: number;
  memo: string;
}

// SelectedIngredient 인터페이스 정의 -  (선택된 재료와 수량 포함)
interface SelectedIngredient extends Ingredient {
  quantity: number;
}

// IngredientView 컴포넌트
function IngredientView(): React.ReactElement {
  // 상태 변수 선언
  const [ingredients, setIngredients] = useState<FridgeIngredient[]>([]); // 재료 목록 상태
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // 선택된 재료 ID 목록 상태
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // BottomSheet 열림 상태
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false); // 일괄 삭제 모달 열림 상태
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false); // 일괄 삭제 모드 활성화 상태

  const navigate = useNavigate(); // page navigation을 위한 hooks

  // 컴포넌트가 처음 렌더링될 때 재료 데이터 로드
  useEffect(() => {
    setIngredients(fridgeIngredientData as FridgeIngredient[]);
  }, []);

  // 재료 선택 또는 일괄 삭제 모드에 따라 동작
  const handleSelect = useCallback(
    (ingredient: FridgeIngredient) => {
      if (isBulkDeleteMode) {
        // 일괄 삭제 모드일 때
        setSelectedIds(
          (prevIds) =>
            prevIds.includes(ingredient.id)
              ? prevIds.filter((id) => id !== ingredient.id) // 선택 해제
              : [...prevIds, ingredient.id], // 선택 추가
        );
      } else {
        // 일반 모드일 때 - 각 재료 목록을 선택하면 해당 ID에 맞는 재료 navigate 이동 : /ingredients/$
        navigate(`/ingredients/${ingredient.id}`, {
          state: {
            ingredientId: ingredient.ingredient.id,
            ingredientName: ingredient.ingredient.originName,
            quantity: ingredient.quantity,
            expirationDate: ingredient.expirationDate,
            createdDate: ingredient.createdDate,
          },
        });
      }
    },
    [isBulkDeleteMode, navigate],
  );

  // 모든 재료를 선택하거나 선택 해제하는 함수
  const handleSelectAll = useCallback(() => {
    setSelectedIds(
      (prevIds) =>
        prevIds.length === ingredients.length
          ? [] // 이미 모든 재료가 선택된 상태면 선택 해제
          : ingredients.map((ing) => ing.id), // 모든 재료 선택
    );
  }, [ingredients]);

  // BottomSheet 열기 함수
  const handleAddButtonClick = useCallback(() => {
    setIsBottomSheetOpen(true);
  }, []);

  // BottomSheet 닫기 함수
  const closeBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(false);
  }, []);

  // 일괄 삭제 처리 함수
  const handleBulkDelete = useCallback(() => {
    if (isBulkDeleteMode) {
      // 일괄 삭제 모드일 때
      if (selectedIds.length > 0) {
        setBulkDeleteModalOpen(true); // 삭제 모달 열기
      } else {
        setIsBulkDeleteMode(false); // 선택된 재료가 없으면 일괄 삭제 모드 종료
      }
    } else {
      // 일반 모드일 때
      setIsBulkDeleteMode(true); // 일괄 삭제 모드 활성화
    }
  }, [isBulkDeleteMode, selectedIds]);

  // 일괄 삭제 확인 함수
  const confirmBulkDelete = useCallback(() => {
    if (selectedIds.length > 0) {
      // 선택된 재료가 있을 때
      setIngredients((prevIngredients) =>
        prevIngredients.filter((ing) => !selectedIds.includes(ing.id)),
      ); // 선택된 재료 삭제
      setSelectedIds([]); // 선택된 재료 초기화
    }
    setBulkDeleteModalOpen(false); // 삭제 모달 닫기
    setIsBulkDeleteMode(false); // 일괄 삭제 모드 종료
  }, [selectedIds]);

  // BottomSheet에서 선택된 재료를 처리하는 함수
  const handleIngredientSelect = useCallback(
    (selectedIngredients: SelectedIngredient[]) => {
      // 선택된 재료를 FridgeIngredient 형식으로 변환
      const newIngredients: FridgeIngredient[] = selectedIngredients.map(
        (ing) => ({
          fridgeId: 1, // 기본 값 (fridgeId - 냉장고 ID값)
          id: Date.now() + Math.random(), // 현재 날짜를 기준으로 Date 생성 ? / 사용자 커스텀 재료 ID를 어떻게 저장할것인가?
          fridgeIngreName: ing.originName,
          ingredient: {
            id: ing.id,
            originName: ing.originName,
            category: ing.category,
            mdCategory: ing.mdCategory,
            sbCategory: ing.sbCategory,
          },
          createdDate: new Date().toISOString().split('T')[0], // 오늘 날짜
          expirationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 현재 날짜 기준으로 5일을 더하여 소비기한 자동 설정 커스텀 할 경우 Date.now() + 앞부분 숫자를 변경하기.
            .toISOString()
            .split('T')[0], // 5일 후 날짜
          quantity: ing.quantity,
          weight: 0,
          memo: '',
        }),
      );

      setIngredients((prevIngredients) => [
        ...prevIngredients,
        ...newIngredients,
      ]); // 새로 추가된 재료를 기존 재료 목록에 추가
      setIsBottomSheetOpen(false); // BottomSheet 닫기
    },
    [],
  );

  // 재료 항목 렌더링 함수
  const renderIngredientItem = useCallback(
    (ingredient: FridgeIngredient) => (
      <motion.div
        key={ingredient.id}
        // 재료 항목 스타일 정의
        className={`bg-white p-2 border-2 rounded-2xl shadow-sm cursor-pointer relative ${
          selectedIds.includes(ingredient.id) && isBulkDeleteMode
            ? 'border-2 border-blue-500'
            : ''
        }`}
        onClick={() => handleSelect(ingredient)}
        whileHover={{
          scale: 1.02,
          boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
          transition: { duration: 0.2 },
        }}
        whileTap={{
          scale: 0.95,
          boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
          transition: { duration: 0.1 },
        }}
      >
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold text-sm">{ingredient.fridgeIngreName}</h3>
          {!isBulkDeleteMode && (
            <RiArrowRightSLine className="text-gray-400" size={20} />
          )}
        </div>
        <p className="text-gray-600 text-xs mb-1">
          수량: {ingredient.quantity}
        </p>
        <p className="text-gray-700 font-bold text-xs mb-1">
          소비기한: {ingredient.expirationDate}
        </p>
        <p className="text-gray-400 text-xs">
          재료추가 날짜: {ingredient.createdDate}
        </p>
        {selectedIds.includes(ingredient.id) && isBulkDeleteMode && (
          <span className="absolute top-2 right-2 text-3xl text-blue-500">
            ✓
          </span>
        )}
      </motion.div>
    ),
    [isBulkDeleteMode, selectedIds, handleSelect],
  );

  // 모든 재료가 선택되었는지 여부 확인 - useMemo
  const isAllSelected = useMemo(
    () => ingredients.length > 0 && selectedIds.length === ingredients.length,
    [ingredients.length, selectedIds.length],
  );

  return (
    // 재료목록 div 스타일 정의
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md h-full max-h-[844px] flex flex-col bg-white border-gray-500 rounded-3xl shadow-lg overflow-hidden">
        <div className="flex flex-col p-4 bg-white shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-left text-lg font-bold">재료 목록</h2>
            {isBulkDeleteMode && (
              <span className="font-semibold text-blue-500 text-base">
                선택된 재료: {selectedIds.length}개
              </span>
            )}
          </div>
          {ingredients.length > 0 && (
            <div className="flex justify-between items-center mt-2">
              {isBulkDeleteMode ? (
                <>
                  {/* 일괄 삭제 모드에서 모든 재료 전체 선택 / 선택 해제 버튼 스타일 정의 */}
                  <motion.button
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg flex flex-col items-center justify-center"
                    onClick={handleSelectAll}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isAllSelected ? (
                      <RiCheckboxMultipleBlankLine
                        size={20}
                        className="justify-center"
                      />
                    ) : (
                      <RiCheckboxMultipleFill
                        size={20}
                        className="justify-center"
                      />
                    )}
                    <span className="text-md">
                      {isAllSelected ? '선택 해제' : '전체 선택'}
                    </span>
                  </motion.button>
                  <div className="flex">
                    <motion.button
                      className="px-4 py-2 bg-custom-gray-2 hover:bg-gray-500 text-white rounded-lg flex flex-col items-center justify-center mr-2"
                      onClick={() => setIsBulkDeleteMode(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RiCloseLine size={20} className="justify-center" />
                      <span className="text-md">삭제 취소</span>
                    </motion.button>
                    <motion.button
                      className="px-4 py-2 bg-custom-red hover:bg-red-700 text-white rounded-lg flex flex-col items-center justify-center"
                      onClick={handleBulkDelete}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RiDeleteBinLine size={20} className="justify-center" />
                      <span className="text-md">삭제하기</span>
                    </motion.button>
                  </div>
                </>
              ) : (
                <>
                  <div />
                  {/* 일괄 삭제 모드가 아닐 때 일괄 삭제 버튼 */}
                  <motion.button
                    className="px-4 py-2 bg-custom-red hover:bg-red-700 text-white rounded-lg flex flex-col items-center justify-center"
                    onClick={handleBulkDelete}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RiDeleteBinLine size={20} className="justify-center" />
                    <span className="text-md">일괄삭제</span>
                  </motion.button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col">
          {ingredients.length > 0 ? (
            // 재료 목록을 그리드 형식으로 렌더링
            <div className="grid grid-cols-2 gap-4">
              {ingredients.map(renderIngredientItem)}
            </div>
          ) : (
            // 재료가 없을 때의 나오는 정보 - 텅 비어있어요! 재료를 추가해주세요 문구 출력하여 사용자로부터 "여기를 눌러 재료 추가 버튼클릭을 유도"
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-gray-500 mb-4">
                텅 비어있어요! 재료를 추가해주세요
              </p>
            </div>
          )}
        </div>

        <div className="p-4">
          {/* 재료 추가 버튼 */}
          <motion.button
            className="w-full h-12 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center"
            onClick={handleAddButtonClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RiAddLine size={20} className="mr-2 text-md" />
            <span>여기를 눌러 재료 추가</span>
          </motion.button>
        </div>
      </div>

      {/* BottomSheet 컴포넌트 */}
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={closeBottomSheet}
        onAddMultiple={handleIngredientSelect}
      />

      {/* BulkDeleteModal 컴포넌트 */}
      <BulkDeleteModal
        isOpen={bulkDeleteModalOpen}
        onClose={() => {
          setBulkDeleteModalOpen(false);
          if (selectedIds.length === 0) {
            setIsBulkDeleteMode(false);
          }
        }}
        selectedIngredients={ingredients.filter((ing) =>
          selectedIds.includes(ing.id),
        )}
        onConfirm={confirmBulkDelete}
      />
    </div>
  );
}

export default IngredientView;
