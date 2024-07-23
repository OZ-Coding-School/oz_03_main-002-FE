export interface Ingredient {
  ingredientId: number;
  ingredientName: string;
  category: string;
  mdCategory?: string;
  sbCategory?: string;
}

export interface FridgeIngredient {
  fridgeId: number;
  fridgeIngreId: number;
  fridgeIngreName: string;
  ingredient: Ingredient;
  createdDate: string;
  expirationDate: string;
  quantity: number;
  weight?: number;
  memo?: string;
}
