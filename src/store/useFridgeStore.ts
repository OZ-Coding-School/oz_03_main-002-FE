import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axios from 'axios';

// Fridge 타입 정의
interface Fridge {
  id: string; // api -> fridges_id
  fridge_name: string; // api > fridges_name
}

// FridgeState 타입 정의
interface FridgeState {
  status: string | null;
  token: string | null;
  loading: boolean;
  fridges: Fridge[]; // fridges: 냉장고 여러 개의 배열을 뜻함
}

// FridgeActions 타입 정의
interface FridgeActions {
  updateFridgeName: (id: string, fridge_name: string) => Promise<void>;
}

const useFridgeStore = create<FridgeState & FridgeActions>()(
  devtools(
    persist(
      (set) => ({
        status: null,
        token: null,
        loading: false,
        fridges: [],

        // 냉장고 이름 수정
        updateFridgeName: async (id, fridge_name) => {
          set({ loading: true });
          try {
            await axios.put(`/api/fridges/${id}`, { fridge_name });
            set((state) => ({
              fridges: state.fridges.map((fridge) =>
                fridge.id === id ? { ...fridge, fridge_name } : fridge,
              ), // fridge -> fridges의 배열 안의 각 요소
              loading: false,
              status: '냉장고 이름이 수정되었습니다',
            }));
          } catch (error) {
            const err = error as Error;
            set({ status: err.message, loading: false });
          }
        },
      }),
      {
        name: 'fridge-storage',
      },
    ),
  ),
);

export default useFridgeStore;
