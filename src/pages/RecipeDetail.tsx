import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faUserFriends,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { RecipeDetailType } from '../types/recipeType';

function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeDetailType | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<RecipeDetailType>(
          `http://localhost:3000/recipes/${id}`,
        );
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>레시피를 찾을 수 없습니다.</div>;
  }

  return (
    <div id="recipeDetail-container" className="h-[720px] bg-slate-50">
      {/* 서브 헤더 */}
      <div
        id="recipeDetail-sub-header"
        className="w-full h-10 bg-gray-100 text-sm text-center flex items-center "
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="ml-4 p-2 text-xl text-gray-700 hover:text-gray-900"
        >
          {'<'}
        </button>
        <p className="flex-grow mr-12">{recipe.recipeName}</p>
      </div>
      <div className="overflow-scroll h-full scroll_custom scroll_custom:hover">
        <div id="recipeDetail-image">
          <img
            src={recipe.recipeImgURL}
            alt={recipe.recipeName}
            className="size-full"
          />
        </div>
        <div id="recipeDetail-list" className="h-full bg-gray-100 pt-3">
          <div className="mb-4 rounded-2xl bg-white p-6">
            <h2 className="text-lg font-bold">{recipe.recipeName}</h2>
            <p className="mt-4 text-md">{recipe.description}</p>
            <div className="my-4">
              <div className="mt-5 flex gap-1 justify-between">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUtensils} />
                  <p>{recipe.cookingLevel}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUserFriends} />
                  <p>{recipe.servings}인분</p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} />
                  <p>{recipe.cookingTime}분</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 rounded-2xl bg-white p-6">
            <h3 className="text-lg font-semibold">재료</h3>
            <hr className="my-2 bg-gray-800 h-0.5" />
            {/* <div className="list-outside">
            {recipe.ingredients.map((ingredientDetail) => (
              <ul
                key={ingredientDetail.ingredient.id}
                className="pb-2 pt-2 flex justify-between border-b-[1px]"
              >
                <li className="w-[100px] ">{ingredientDetail.originName}</li>
                <li className="w-[60px]">
                  {ingredientDetail.ingredientQuantity}g
                </li>
                <button
                  type="button"
                  className="bg-gray-200 w-[50px] rounded-3xl"
                >
                  구매
                </button>
              </ul>
            ))}
          </div> */}
          </div>
          <div className="mb-4 rounded-2xl bg-white p-6">
            <h3 className="text-lg font-semibold ">요리 단계</h3>
            <hr className="my-2 bg-gray-800 h-0.5" />
            <p className="my-2">{recipe.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
