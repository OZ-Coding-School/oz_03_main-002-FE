export interface Ingredient {
  id: number;
  originName: string;
  category: string;
  mdCategory?: string;
  sbCategory?: string;
}

export interface FridgeIngredient {
  fridgeId: number;
  id: number;
  fridgeIngreName: string;
  ingredient: Ingredient;
  createdDate: string;
  expirationDate: string;
  quantity: number;
  weight?: number;
  memo?: string;
}

export interface SelectedIngredient extends Ingredient {
  quantity: number;
  createdDate: string;
  expirationDate: string;
}
