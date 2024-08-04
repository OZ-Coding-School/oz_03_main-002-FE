import { TemporaryIngredient } from './ingredientType';

// type OptionalCategoryIngredient = Omit<Ingredient, 'category'> & {
//   category?: string;
// };

export interface RecipeSummary {
  id: number;
  recipeName: string;
  recipeImgURL: string;
  ingredients: TemporaryIngredient[];
}

export interface RecipeDetailType {
  id: number;
  recipeName: string;
  recipeImgURL: string;
  instructions: string;
  description: string; // 오타 수정
  cookingTime: number;
  cookingLevel: string;
  servings: number;
  ingredients: {
    ingredient: TemporaryIngredient;
    ingredientQuantity: number;
  }[];
}

export interface Recipe {
  id: number;
  url: string;
  recipe_name: string;
  nick_name: string;
  recommend_num: number;
  recipe_intro: string;
  eat_people: number;
  difficulty: string;
  cooking_time: number;
  thumbnail_url: string;
  attribute: {
    name: number;
    method: number;
    situation: number;
    main_ingre: number;
    type: number;
  };
  ingredients: {
    ingredient_name: string;
    quantity: string;
  }[];
  created_at: string;
  updated_at: string;
}
