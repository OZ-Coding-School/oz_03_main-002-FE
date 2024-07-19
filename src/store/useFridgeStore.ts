import { create } from 'zustand';
import fridgeData from '../data/fridgeData.ts';
import { Refrigerator, RefrigeratorMode } from '../types/fridgeType.ts';

type FridgeState = {
  fridges: Refrigerator[];
  showModal: boolean;
  currentMode: RefrigeratorMode;
  fetchFridges: () => void;
  setShowModal: (show: boolean) => void;
  setCurrentMode: (mode: RefrigeratorMode) => void;
  addFridge: (refrigerator: Omit<Refrigerator, 'id'>) => void;
  updateFridge: (id: number, refrigerator: Omit<Refrigerator, 'id'>) => void;
  deleteFridge: (id: number) => void;
};

export const useFridgeStore = create<FridgeState>((set) => ({
  fridges: fridgeData,
  showModal: false,
  currentMode: 'add',
  fetchFridges: async () => {
    // 더미 데이터를 사용하므로 실제 API 호출 없이 상태를 설정합니다.
    set({ fridges: fridgeData });
  },
  setShowModal: (show) => set({ showModal: show }),
  setCurrentMode: (mode) => set({ currentMode: mode }),
  addFridge: async (refrigerator) => {
    const newFridge: Refrigerator = {
      id: Math.max(...fridgeData.map((f) => f.id)) + 1, // 새 ID 생성
      ...refrigerator,
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
      isActivate: true,
    };
    set((state) => ({ fridges: [...state.fridges, newFridge] }));
  },
  updateFridge: async (id, refrigerator) => {
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
  deleteFridge: async (id) => {
    set((state) => ({
      fridges: state.fridges.filter((fridge) => fridge.id !== id),
    }));
  },
}));
