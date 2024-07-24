import { create } from 'zustand';
import {
  FridgeState,
  Refrigerator,
  RefrigeratorMode,
} from '../types/fridgeType';
import axios from '../api/axios';

const useFridgeStore = create<FridgeState>((set, get) => ({
  fridges: [],
  showModal: false,
  currentMode: '' as RefrigeratorMode,
  fetchFridges: async () => {
    try {
      const response = await axios.get<Refrigerator[]>('/fridges');
      set({ fridges: response.data });
    } catch (error) {
      console.log('Failed to fetch fridges', error);
    }
  },
  setShowModal: (show) => set({ showModal: show }),
  setCurrentMode: (mode) => set({ currentMode: mode }),
  addFridge: async (data: { fridgeName: string }) => {
    try {
      let { fridges } = get();
      if (!Array.isArray(fridges)) {
        fridges = await fridges;
      }
      const newId =
        fridges.length > 0
          ? Math.max(...fridges.map((fridge) => Number(fridge.id))) + 1
          : 1;
      const newFridge: Refrigerator = {
        id: newId.toString(),
        ...data,
        ingreList: [],
        createAt: new Date().toISOString().substring(0, 10),
        updateAt: new Date().toISOString().substring(0, 10),
        isActivate: true,
      };
      const response = await axios.post('/fridges', newFridge);
      if (response.status === 200) {
        set(() => {
          const updatedFridges = [...fridges, newFridge];
          return { fridges: updatedFridges };
        });
      }
    } catch (error) {
      console.log('Failed to add fridge', error);
    }
  },
  updateFridge: async (refrigerator) => {
    const { id } = refrigerator;
    const updatedFridge = {
      ...refrigerator,
      updatedAt: new Date().toISOString(),
    };
    const response = await axios.put(`/fridges/${id}`, updatedFridge);
    console.log(response);
    set((state) => ({
      fridges: state.fridges.map((fridge: Refrigerator) =>
        fridge.id === id ? updatedFridge : fridge,
      ),
    }));
  },
  deleteFridge: async (id: string) => {
    console.log('try delete fridge');
    try {
      const response = await axios.delete(`/fridges/${id}`);
      if (response.status === 200) {
        set((state) => {
          const updatedFridges = state.fridges.filter(
            (fridge: Refrigerator) => fridge.id !== id,
          );
          // saveFridgeToLocalStorage(updatedFridges);
          return { fridges: updatedFridges };
        });
        console.log('Fridge deleted successfully');
      } else {
        console.log('Failed to delete fridge');
      }
    } catch (error) {
      console.log('Failed to delete.', error);
    }
  },
}));

export default useFridgeStore;
