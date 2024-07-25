import { create } from 'zustand';
import { FridgeIngredient } from '../types/ingredientType';

interface IngredientStore {
  ingredients: FridgeIngredient[];
  setIngredients: (ingredients: FridgeIngredient[]) => void;
  updateIngredient: (updatedIngredient: FridgeIngredient) => void;
  deleteIngredient: (id: number) => void; // deleteIngredient 함수 추가
}

const useIngredientStore = create<IngredientStore>((set) => ({
  ingredients: [],
  setIngredients: (ingredients) => set({ ingredients }),
  updateIngredient: (updatedIngredient) =>
    set((state) => ({
      ingredients: state.ingredients.map((ingredient) =>
        ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient,
      ),
    })),
  deleteIngredient: (
    id: number, // deleteIngredient 함수 정의
  ) =>
    set((state) => ({
      ingredients: state.ingredients.filter(
        (ingredient) => ingredient.id !== id,
      ),
    })),
}));

export default useIngredientStore;
