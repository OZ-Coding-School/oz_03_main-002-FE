import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RecipeSummary, RecipeDetailType } from '../types/recipeType';
import { Ingredient } from '../types/ingredientType';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function RecipesView() {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log('현재 레시피 목록:', recipes);

  // 레시피 데이터를 가져오는 함수
  const fetchRecipes = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      console.log(`Fetching data for page ${page}...`);
      const response = await axios.get<RecipeDetailType[]>(
        'http://localhost:3000/recipes',
        {
          params: {
            _page: page,
            _limit: 10,
          },
        },
      );
      if (Array.isArray(response.data)) {
        const newRecipes = response.data.map((recipeDetail) => ({
          ...recipeDetail.recipeSummary,
          // RecipeDetailType의 ingredients 배열을 RecipeSummary의 ingredients 배열로 변환
          ingredients: recipeDetail.ingredients.map((ing) => ing.ingredient),
        }));

        setRecipes((prevRecipes) => {
          const mergedRecipes = [...prevRecipes, ...newRecipes];
          const uniqueRecipes = Array.from(
            new Set(mergedRecipes.map((recipe) => recipe.id)),
          )
            .map((id) => mergedRecipes.find((recipe) => recipe.id === id))
            .filter((recipe): recipe is RecipeSummary => !!recipe);
          console.log('Merged and unique recipes:', uniqueRecipes);
          return uniqueRecipes;
        });

        setHasMore(response.data.length === 10);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setHasMore(false);
    }
  }, [page]);

  // 페이지가 변경될 때마다 레시피 데이터를 가져옴
  useEffect(() => {
    fetchRecipes();
  }, [page]);

  // 레시피 클릭 시 상세 페이지로 이동하는 함수
  const handleRecipeClick = (id: number) => {
    navigate(`/recipes/${id}`);
  };

  console.log('마지막 레시피 데이터', page);

  return (
    // 전체 컨테이너
    <div
      id="recipesView-container"
      className="h-[740px] overflow-scroll scroll_custom scroll_custom:hover"
    >
      {/* 서브 헤더 */}
      <div
        id="recipesView-header"
        className="w-full h-[50px] bg-slate-100 text-center flex"
      >
        <p className="m-auto">레시피 홈</p>
      </div>
      {/* 헤더 및 서브헤더를 제외한 모든 요소의 컨테이너 */}
      <div id="recipesView-all-features" className="p-4 h-full ">
        {/* 검색바(전체) */}
        <div id="recipesView-search-bar" className="mb-5">
          {/* 검색바 제목 */}
          <h2 className="text-lg mb-3 font-bold">레시피 검색</h2>
          {/* 검색바 input (현재 아무 기능 없음) */}
          <div className="flex items-center bg-white">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
            <input
              type="search"
              placeholder="이 서비스는 비영리 목적으로 제작되었습니다."
              className="w-full p-2 border rounded placeholder-text"
            />
          </div>
        </div>
        {/* 레시피 목록(전체) */}
        <div className="h-full">
          {/* 레시피 목록 제목 */}
          <h2 className="text-lg mb-4 font-bold">레시피 목록</h2>
          {/* 레시피 목록 본문 */}
          <InfiniteScroll
            dataLength={recipes.length}
            next={fetchRecipes}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>모든 레시피를 불러왔습니다.</b>
              </p>
            }
            scrollThreshold={0.8}
          >
            {/* 레시피 카드 요소 */}
            <div id="scrollableDiv" className="grid grid-cols-2 gap-2 h-full">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-lg shadow-md cursor-pointer mb-5"
                  onClick={() => handleRecipeClick(recipe.id)}
                >
                  <div>
                    <img
                      src={recipe.recipeImgURL}
                      alt={recipe.recipeName}
                      className="w-full h-auto object-cover rounded"
                    />
                  </div>
                  <div className="p-2">
                    <h2 className="mt-2 text-xs font-bold truncate">
                      {recipe.recipeName}
                    </h2>
                    <div className="flex flex-wrap mt-1">
                      {recipe.ingredients
                        .filter(
                          (ingredient: Ingredient) =>
                            ingredient.originName.length <= 3,
                        )
                        .slice(0, 3)
                        .map((ingredient: Ingredient) => (
                          <span
                            key={ingredient.id}
                            className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1 mr-1 mb-1"
                          >
                            {ingredient.originName}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
        {/* 레시피 목록(전체) 종료 */}
      </div>
      {/* 헤더 및 서브헤더를 제외한 모든 요소의 컨테이너 종료 */}
    </div>
  );
}

export default RecipesView;
