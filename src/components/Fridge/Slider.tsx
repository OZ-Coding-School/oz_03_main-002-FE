import React, { useState } from 'react';
import './Slider.css'; // 슬라이더 컴포넌트의 스타일을 정의한 CSS 파일을 가져옴
import { RefrigeratorIngre } from '../../types/fridgeType';

type SliderProps = {
  ingredients: RefrigeratorIngre[];
  sliderId: number;
};

function Slider({ ingredients = [], sliderId }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideWidth = 4;

  const totalPages = ingredients.length
    ? Math.ceil(ingredients.length / slideWidth)
    : 1;

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
        {ingredients.length === 0 ? (
          <p className="empty-item text-slate-500 text-sm px- py-3.5">
            재료 목록 보기에서 <br />
            재료를 추가하세요
          </p>
        ) : (
          ingredients
            .slice(currentIndex, currentIndex + slideWidth)
            .map((ingredient) => (
              <div key={ingredient?.id} className="slider-item">
                <p className="slider-item__name">{ingredient?.ingreName}</p>
                <p className="slider-item__blank" />
                <p className="slider-item__date">
                  {ingredient?.expirationDate}
                </p>
              </div>
            ))
        )}
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
