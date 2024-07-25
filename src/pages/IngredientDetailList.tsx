import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteModal from '../components/DeleteModal.tsx';
import { FridgeIngredient } from '../types/ingredientType';
import useIngredientStore from '../store/useIngredientStore';

function IngredientDetailList() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ingredients, setIngredients, deleteIngredient } =
    useIngredientStore();
  const [ingredient, setIngredient] = useState<FridgeIngredient | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get<FridgeIngredient[]>(
          'http://localhost:3001/fridgeIngredients',
        );
        setIngredients(response.data);
      } catch (error) {
        console.error('Failed to fetch ingredients:', error);
      }
    };

    fetchIngredients();
  }, [setIngredients]);

  useEffect(() => {
    const foundIngredient = ingredients.find((item) => item.id === Number(id));
    if (foundIngredient) {
      setIngredient(foundIngredient);
    } else {
      console.error('재료를 찾을 수 없습니다.');
    }
  }, [id, ingredients]);

  const handleDelete = async () => {
    if (id) {
      try {
        await axios.delete(`http://localhost:3001/fridgeIngredients/${id}`);
        deleteIngredient(Number(id));
        navigate('/ingredientView');
      } catch (error) {
        console.error('Failed to delete ingredient:', error);
      }
    }
  };

  if (!ingredient) {
    return <div>재료를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md h-full max-h-[844px] flex flex-col bg-white shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-white shadow">
          <button
            type="button"
            onClick={() => navigate('/ingredientView')}
            className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg py-2 px-6 text-sm"
          >
            되돌아가기
          </button>
          <h2 className="text-lg">재료 정보</h2>
        </div>
        <div className="relative m-5">
          <h2 className="text-lg mb-10">재료 정보</h2>
          <div className="absolute top-0 right-0 flex space-x-2">
            <button
              type="button"
              onClick={() => navigate(`/ingredientDetailEdit/${ingredient.id}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-6 text-sm"
            >
              수정
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-6 text-sm"
            >
              삭제
            </button>
          </div>
          <div>
            <p className="mb-2">재료 이름: {ingredient.fridgeIngreName}</p>
            <p className="mb-2">소비기한: {ingredient.expirationDate}</p>
            <p className="mb-2">카테고리: {ingredient.ingredient.category}</p>
            <p className="mb-2">개수: {ingredient.quantity}</p>
            <p className="mb-2">등록일: {ingredient.createdDate}</p>
            <p className="mb-2">중량: {ingredient.weight}</p>
            <p className="mb-2">메모: {ingredient.memo}</p>
          </div>
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            ingredient={ingredient}
          />
        </div>
      </div>
    </div>
  );
}

export default IngredientDetailList;
