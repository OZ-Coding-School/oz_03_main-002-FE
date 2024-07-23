import { create } from 'zustand';
import {
  FridgeState,
  Refrigerator,
  RefrigeratorMode,
} from '../types/fridgeType';
import axios from '../api/axios';

// const getFridgesFromLocalStorage = (): Refrigerator[] => {
//   const data = localStorage.getItem('fridges');
//   return data ? JSON.parse(data) : [];
// };

// const saveFridgeToLocalStorage = (fridges: Refrigerator[]) => {
//   localStorage.setItem('fridges', JSON.stringify(fridges));
// };

// const getFridges = async (): Promise<Refrigerator[]> => {
//   try {
//     const response = await axios.get<Refrigerator[]>("'api/fridges");
//     set({fridgeData: response.data});
//   } catch (error) {
//     console.log('Failed to fetch fridge', error);
//   }
// };

const useFridgeStore = create<FridgeState>((set, get) => ({
  fridges: [],
  showModal: false,
  currentMode: '' as RefrigeratorMode,
  fetchFridges: async () => {
    try {
      const response = await axios.get<Refrigerator[]>('/fridges');
      set({ fridges: response.data });
      // return response.data;
    } catch (error) {
      console.log('Failed to fetch fridges', error);
    }
  },
  setShowModal: (show) => set({ showModal: show }),
  setCurrentMode: (mode) => set({ currentMode: mode }),
  addFridge: async (refrigerator: Omit<Refrigerator, 'id'>) => {
    try {
      const fridges = get().fridges;
      const newId =
        fridges.length > 0 ? Math.max(...fridges.map((f) => f.id)) + 1 : 1;
      const newFridge: Refrigerator = {
        id: newId.toString(),
        ...refrigerator,
        createAt: new Date().toISOString().substring(0, 10),
        updateAt: new Date().toISOString().substring(0, 10),
        isActivate: true,
      };
      const response = await axios.post('/fridges', newFridge);
      set((state) => {
        const updatedFridges = [...state.fridges, response.data];
        // saveFridgeToLocalStorage(updatedFridges);
        return { fridges: updatedFridges };
      });
    } catch (error) {
      console.log('Failed to add fridge', error);
    }
  },
  updateFridge: async (refrigerator: Omit<Refrigerator, 'updatedAt'>) => {
    const id = refrigerator.id;
    const updatedFridge = {
      ...refrigerator,
      updatedAt: new Date().toISOString(),
    };
    const response = await axios.put(`/fridges/${id}`, updatedFridge);
    set((state) => ({
      fridges: state.fridges.map((fridge) =>
        fridge.id === id ? updatedFridge : fridge,
      ),
    }));
  },
  deleteFridge: async (id: number) => {
    console.log('try delete fridge');
    try {
      const response = await axios.delete(`/fridges/${id}`);
      console.log(response.data);
      if (response.status === 200) {
        set((state) => {
          const updatedFridges = state.fridges.filter(
            (fridge) => fridge.id !== id,
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
