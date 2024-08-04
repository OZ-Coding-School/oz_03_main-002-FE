import { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { RecipeSummary } from '../types/recipeType';
import RecipeCard from '../components/RecipeCard.tsx';

function RecipesView() {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 컴포넌트가 처음 렌더링될 때 첫 번째 페이지의 레시피를 가져옵니다.
  useEffect(() => {
    axios
      .get<RecipeSummary[]>('http://localhost:3000/recipes?offset=0&limit=10')
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 추가 레시피 데이터를 가져오는 함수입니다.
  const fetchRecipes = () => {
    axios
      .get<RecipeSummary[]>(
        `http://localhost:3000/recipes?offset=${page * 10}&limit=10`,
      )
      .then((res) => {
        setRecipes((prevRecipes) => [...prevRecipes, ...res.data]);
        setHasMore(res.data.length > 0); // 더 이상 레시피가 없으면 hasMore를 false로 설정합니다.
      })
      .catch((err) => console.log(err));
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div id="recipesView-container" className="h-[740px]">
      <div
        id="recipesView-header"
        className="w-full h-10 bg-gray-100 text-center text-sm flex"
      >
        <p className="m-auto">레시피 홈</p>
      </div>
      <InfiniteScroll
        dataLength={recipes.length}
        next={fetchRecipes}
        hasMore={hasMore}
        loader={<h2>로딩중...</h2>}
        scrollableTarget="scrollableDiv"
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>모든 레시피를 불러왔습니다.</b>
          </p>
        }
      >
        <div
          id="scrollableDiv"
          className="p-4 h-full overflow-scroll scroll_custom scroll_custom:hover"
        >
          <div id="recipesView-search-bar" className="mb-6">
            <div className="flex items-center bg-white">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
              <input
                type="search"
                placeholder="이 서비스는 비영리 목적으로 제작되었습니다."
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="h-full">
            <h2 className="text-lg mb-4 font-bold">레시피 목록</h2>
            <div className="h-screen">
              <div className="grid grid-cols-2 gap-4">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default RecipesView;
