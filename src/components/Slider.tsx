import React, { useState } from 'react';
import './Slider.css'; // 슬라이더 컴포넌트의 스타일을 정의한 CSS 파일을 가져옴
import { RefrigeratorIngre } from './types/fridgeType';

// SliderProps 타입 정의: ingredients 배열을 받아옴
type SliderProps = {
  ingredients: RefrigeratorIngre[];
  sliderId: number;
};

function Slider({ ingredients, sliderId }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // 한 번에 보여줄 슬라이드의 개수
  const slideWidth = 4;
  const totalPages = Math.ceil(ingredients.length / slideWidth);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index * slideWidth);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    index: number,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setCurrentIndex(index * slideWidth);
    }
  };

  return (
    <div className="slider-container">
      {/* 슬라이드 내용을 담는 컨테이너 */}
      <div className="slider-content">
        {ingredients
          .slice(currentIndex, currentIndex + slideWidth) // 현재 인덱스부터 슬라이드 크기만큼의 재료를 잘라냄
          .map((ingredient) => (
            <div key={ingredient.id} className="slider-item">
              <p className="slider-item__name">{ingredient.ingre_name}</p>
              <p className="slider-item__blank"></p>
              <p className="slider-item__date">{ingredient.expiration_date}</p>
            </div>
          ))}
      </div>
      {/* 도트 네비게이션 컨테이너 */}
      {totalPages > 1 && (
        <div className="dots-container">
          {Array.from({ length: totalPages }, (_, index) => (
            <span
              key={`${sliderId}-${index}`}
              className={`dot ${currentIndex / slideWidth === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              onKeyDown={(event) => {
                handleKeyDown(event, index);
              }}
              tabIndex={0}
              role="button"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Slider;
