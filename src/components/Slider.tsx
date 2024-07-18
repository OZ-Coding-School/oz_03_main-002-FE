import React, { useState } from 'react';
import './Slider.css'; // 슬라이더 컴포넌트의 스타일을 정의한 CSS 파일을 가져옴
import { Ingredient } from '../store/fridgeStore'; // Ingredient 타입을 가져옴

// SliderProps 타입 정의: ingredients 배열을 받아옴
type SliderProps = {
  ingredients: Ingredient[];
};

// Slider 컴포넌트 정의: 재료 목록을 슬라이더 형식으로 표시
const Slider: React.FC<SliderProps> = ({ ingredients }) => {
  // 현재 슬라이더의 시작 인덱스를 상태로 관리
  const [currentIndex, setCurrentIndex] = useState(0);

  // 한 번에 보여줄 슬라이드의 개수
  const slideWidth = 4;

  // 전체 페이지 수를 계산: 재료 목록을 슬라이드 크기로 나눈 값
  const totalPages = Math.ceil(ingredients.length / slideWidth);

  // 도트를 클릭할 때 호출되는 함수: 클릭된 도트의 인덱스를 기준으로 currentIndex를 설정
  const handleDotClick = (index: number) => {
    setCurrentIndex(index * slideWidth);
  };

  return (
    <div className="slider-container">
      {/* 슬라이드 내용을 담는 컨테이너 */}
      <div className="slider-content">
        {ingredients
          .slice(currentIndex, currentIndex + slideWidth) // 현재 인덱스부터 슬라이드 크기만큼의 재료를 잘라냄
          .map((ingredient) => (
            <div key={ingredient.id} className="slider-item">
              <p className="slider-item__name">
                {ingredient.name} {/* 재료 이름 표시 */}
              </p>
              <p className="slider-item__">{ingredient.description}</p>
            </div>
          ))}
      </div>
      {/* 도트 네비게이션 컨테이너 */}
      {totalPages > 1 && (
        <div className="dots-container">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex / slideWidth === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
