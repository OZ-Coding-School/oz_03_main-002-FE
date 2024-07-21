import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IngredientTestData from '../data/IngredientTestData.json';
import DeleteModal from '../components/DeleteModal.tsx'; // 파일 확장자 추가
import { Ingredient } from '../types/types';

function IngredientDetailList() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      if (id) {
        const foundIngredient = IngredientTestData.find(
          (item) => item.id === Number(id),
        );
        if (foundIngredient) {
          const localData = JSON.parse(localStorage.getItem(id) || '{}');
          setIngredient({ ...foundIngredient, ...localData });
        } else {
          console.error('재료를 찾을 수 없습니다.');
        }
      } else {
        console.error('유효하지 않은 ID입니다.');
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const handleStorageChange = () => {
      if (id) {
        const localData = JSON.parse(localStorage.getItem(id) || '{}');
        setIngredient((prev) => (prev ? { ...prev, ...localData } : prev));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [id]);

  const handleDelete = () => {
    if (id) {
      localStorage.removeItem(id);
      navigate('/ingredientView');
    }
  };

  if (!ingredient) {
    return <div>재료를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h2>재료 정보</h2>
      <p>재료 이름: {ingredient.name}</p>
      <p>소비기한: {ingredient.expirationDate}</p>
      <p>개수: {ingredient.quantity}</p>
      <p>중량: {ingredient.weight || '중량을 입력해주세요.'}</p>
      <p>카테고리: {ingredient.category}</p>
      {/* {ingredient.image ? (
        <img
          src={ingredient.image}
          alt={ingredient.name}
          style={{ width: '200px', height: '200px' }}
        />
      ) : (
        '이미지를 추가해주세요.'
      )} */}
      <button
        type="button"
        onClick={() => navigate(`/ingredients/${ingredient.id}/edit`)}
      >
        수정
      </button>
      <button
        type="button"
        onClick={() => setIsDeleteModalOpen(true)}
        className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-4 text-sm"
      >
        삭제
      </button>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        ingredient={ingredient}
      />
    </div>
  );
}

export default IngredientDetailList;
