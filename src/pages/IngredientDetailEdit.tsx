import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoCalendarOutline } from 'react-icons/io5';
import { Ingredient } from '../types/types';
import IngredientTestData from '../data/IngredientTestData.json';
import Calendar from '../components/Calendar.tsx';

function IngredientDetailEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<Ingredient | null>(null);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const foundIngredient = IngredientTestData.find(
        (item) => item.id === Number(id),
      );
      if (foundIngredient) {
        const localData = JSON.parse(localStorage.getItem(id) || '{}');
        const mergedData = { ...foundIngredient, ...localData };
        setFormState(mergedData);
        // setImagePreview(mergedData.image || null);
      } else {
        console.error('재료를 찾을 수 없습니다.');
      }
    } else {
      console.error('유효하지 않은 ID입니다.');
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string);
  //       setFormState((prev) =>
  //         prev ? { ...prev, image: reader.result as string } : null,
  //       );
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSave = () => {
    if (formState) {
      localStorage.setItem(id!, JSON.stringify(formState));
      navigate(`/ingredients/${id}`);
    }
  };

  const handleDateSelect = (date: Date) => {
    setFormState((prev) =>
      prev
        ? { ...prev, expirationDate: date.toISOString().split('T')[0] }
        : null,
    );
  };

  if (!formState) return <div>Loading...</div>;

  return (
    <div className="ingredient-edit-page">
      <h2>재료 수정</h2>
      <div>
        <label htmlFor="name">재료 이름:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="expirationDate">소비기한:</label>
        <input
          type="text"
          id="expirationDate"
          name="expirationDate"
          value={formState.expirationDate}
          onChange={handleChange}
        />
        <IoCalendarOutline
          onClick={() => setIsCalendarOpen(true)}
          className="calendar-icon"
        />
      </div>
      <div>
        <label htmlFor="quantity">개수:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formState.quantity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="weight">중량:</label>
        <input
          type="text"
          id="weight"
          name="weight"
          value={formState.weight || ''}
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label htmlFor="image">이미지:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="미리보기"
            style={{ width: '200px', height: '200px' }}
          />
        )}
      </div> */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={() => navigate(`/ingredients/${id}`)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg py-2 px-4 text-sm mr-2"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 text-sm"
        >
          저장
        </button>
      </div>
      <Calendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSelectDate={handleDateSelect}
      />
    </div>
  );
}

export default IngredientDetailEdit;
