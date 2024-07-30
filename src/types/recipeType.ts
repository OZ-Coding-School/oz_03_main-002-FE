import { Ingredient } from './ingredientType';

type OptionalCategoryIngredient = Omit<Ingredient, 'category'> & {
  category?: string;
};

export interface RecipeSummary {
  id: number;
  recipeName: string;
  recipeImgURL: string;
  ingredients: Ingredient[];
}

export interface RecipeDetailType {
  recipeSummary: RecipeSummary;
  instructions: string;
  description: string; // 오타 수정
  cookingTime: number;
  cookingLevel: string;
  servings: number;
  ingredients: {
    ingredient: OptionalCategoryIngredient;
    ingredientQuantity: number;
  }[];
}
