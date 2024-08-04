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

export interface TemporaryIngredient {
  id: number;
  name: string;
  is_custom: boolean;
  major: string;
  middle?: string;
  sub?: string;
  created_by?: string;
}
