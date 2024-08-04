import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FridgeIngredient } from '../types/ingredientType';
import useIngredientStore from '../store/useIngredientStore';

function IngredientDetailEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ingredients, updateIngredient } = useIngredientStore();
  const [formState, setFormState] = useState<FridgeIngredient | null>(null);

  useEffect(() => {
    if (id) {
      const foundIngredient = ingredients.find(
        (item) => item.id === Number(id),
      );
      if (foundIngredient) {
        setFormState(foundIngredient);
      } else {
        console.error('재료를 찾을 수 없습니다.');
      }
    } else {
      console.error('유효하지 않은 ID입니다.');
    }
  }, [id, ingredients]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((prev) => {
      if (!prev) return null;

      if (name in prev.ingredient) {
        return {
          ...prev,
          ingredient: {
            ...prev.ingredient,
            [name]: value,
          },
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSave = () => {
    if (formState) {
      updateIngredient(formState);
      navigate(`/ingredients/${id}`);
    }
  };

  if (!formState) return <div>Loading...</div>;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md h-full max-h-[844px] flex flex-col bg-white shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-white shadow">
          <h2 className="text-lg">재료 수정</h2>
        </div>
        <div className="relative">
          <div className="inline-block absolute top-0 right-0 mt-4 mr-4 space-x-2 ">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-6 text-sm"
            >
              저장
            </button>
            <button
              type="button"
              onClick={() => navigate(`/ingredients/${id}`)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg py-2 px-7 text-sm mr-2"
            >
              취소
            </button>
          </div>
          <div className="m-5">
            <p className="text-lg">재료 수정</p>
            <div className="mt-9">
              <label htmlFor="fridgeIngreName">재료 이름: </label>
              <input
                type="text"
                id="fridgeIngreName"
                name="fridgeIngreName"
                value={formState.fridgeIngreName}
                onChange={handleChange}
                placeholder="재료 이름을 입력해주세요."
              />
            </div>
            <div className="mt-2 flex">
              <label htmlFor="expirationDate">소비기한: </label>
              <input
                className="w-50"
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={formState.expirationDate}
                onChange={handleChange}
                placeholder="소비기한을 설정해주세요."
              />
            </div>
            <div className="mt-2">
              <label htmlFor="category">카테고리: </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formState?.ingredient.category || ''}
                onChange={handleChange}
                placeholder="카테고리를 등록해주세요"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="quantity">개수: </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formState.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="createdDate">등록일: </label>
              <input
                type="date"
                id="createdDate"
                name="createdDate"
                value={formState.createdDate || ''}
                onChange={handleChange}
                placeholder="등록일을 선택해주세요."
              />
            </div>
            <div className="mt-2">
              <label htmlFor="weight">중량: </label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={formState.weight || ''}
                onChange={handleChange}
                placeholder="중량을 입력해주세요."
              />
            </div>
            <label htmlFor="memo">메모: </label>
            <input
              type="text"
              id="memo"
              name="memo"
              value={formState.memo || ''}
              onChange={handleChange}
              placeholder="메모를 입력해주세요"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetailEdit;
