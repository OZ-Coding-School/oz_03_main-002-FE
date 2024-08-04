import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types/recipeType';

interface RecipeCardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  const navigate = useNavigate();

  const handleRecipeClick = (id: number) => {
    navigate(`/recipes/${id}`);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    id: number,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleRecipeClick(id);
    }
  };

  return (
    <div
      id="recipe-card"
      role="button"
      tabIndex={0}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg cursor-pointer"
      onClick={() => handleRecipeClick(recipe.id)}
      onKeyDown={(event) => handleKeyPress(event, recipe.id)}
    >
      <img
        src={recipe.thumbnail_url}
        alt={recipe.recipe_name}
        className="w-full h-[113px] object-cover rounded-t-2xl bg-white "
      />
      <div id="recipe-text" className="p-2">
        <h2 className="mb-2 ml-1 text-sm font-bold truncate">
          {recipe.recipe_name}
        </h2>
        <div id="ingredient-span" className="flex flex-wrap mt-1">
          {recipe.ingredients
            .filter(
              (ingredient) =>
                ingredient &&
                ingredient.ingredient_name &&
                ingredient.ingredient_name.length <= 4,
            )
            .slice(0, 2)
            .map((ingredient) => (
              <span
                key={ingredient.ingredient_name} // Assuming ingredient has an id property
                className="bg-gray-200 text-xs rounded-full px-2 py-1 mr-1"
              >
                {ingredient.ingredient_name}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
