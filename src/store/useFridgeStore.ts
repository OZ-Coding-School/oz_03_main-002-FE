import { create } from 'zustand';
import {
  FridgeState,
  Refrigerator,
  RefrigeratorMode,
} from '../types/fridgeType';

const getFridgesFromLocalStorage = (): Refrigerator[] => {
  const data = localStorage.getItem('fridges');
  return data ? JSON.parse(data) : [];
};

const saveFridgeToLocalStorage = (fridges: Refrigerator[]) => {
  localStorage.setItem('fridges', JSON.stringify(fridges));
};

const useFridgeStore = create<FridgeState>((set) => ({
  fridges: getFridgesFromLocalStorage(),
  showModal: false,
  currentMode: '' as RefrigeratorMode,
  fetchFridges: async () => {
    // TODO 실제 API 호출시 코드 수정 필요
    const fridgeData = getFridgesFromLocalStorage();
    set({ fridges: fridgeData });
  },
  setShowModal: (show) => set({ showModal: show }),
  setCurrentMode: (mode) => set({ currentMode: mode }),
  addFridge: async (refrigerator: Omit<Refrigerator, 'id'>) => {
    const fridges = getFridgesFromLocalStorage();
    const newId =
      fridges.length > 0 ? Math.max(...fridges.map((f) => f.id)) + 1 : 1;
    const newFridge: Refrigerator = {
      id: newId,
      ...refrigerator,
      createAt: new Date().toISOString().substring(0, 10),
      updateAt: new Date().toISOString().substring(0, 10),
      isActivate: true,
    };
    set((state) => {
      const updatedFridges = [...state.fridges, newFridge];
      saveFridgeToLocalStorage(updatedFridges);
      return { fridges: updatedFridges };
    });
  },
  updateFridge: async (id: number, refrigerator) => {
    const updatedFridge = {
      ...refrigerator,
      id,
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      fridges: state.fridges.map((fridge) =>
        fridge.id === id ? updatedFridge : fridge,
      ),
    }));
  },
  deleteFridge: async (id: number) => {
    set((state) => {
      const updatedFridges = state.fridges.filter((fridge) => fridge.id !== id);
      saveFridgeToLocalStorage(updatedFridges);
      return { fridges: updatedFridges };
    });
  },
}));

export default useFridgeStore;
