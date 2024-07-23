import create from 'zustand';
import { FridgeIngredient } from '../types/ingredientType';

interface IngredientStore {
  ingredients: FridgeIngredient[];
  setIngredients: (ingredients: FridgeIngredient[]) => void;
  updateIngredient: (updatedIngredient: FridgeIngredient) => void;
}

const useIngredientStore = create<IngredientStore>((set) => ({
  ingredients: [],
  setIngredients: (ingredients) => set({ ingredients }),
  updateIngredient: (updatedIngredient) =>
    set((state) => ({
      ingredients: state.ingredients.map((ingredient) =>
        ingredient.fridgeIngreId === updatedIngredient.fridgeIngreId
          ? updatedIngredient
          : ingredient,
      ),
    })),
}));

export default useIngredientStore;
