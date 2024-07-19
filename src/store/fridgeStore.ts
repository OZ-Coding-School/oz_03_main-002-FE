// src/store/fridgeStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// 냉장고에 추가된 재료 타입
export type RefrigeratorIngreList = {
  id: number;
  name: string;
  quantity: number;
  registration_date: string;
  expiration_date: string;
  category: string;
  weight?: number;
};

// 사용자의 냉장고
export type Refrigerator = {
  id: number;
  fridges_name: string; // TODO 백엔드에 항목 추가 요청해야함
  create_at: string;
  update_at: string;
  is_activate: boolean;
  // TODO 어떻게 매칭을 시킬지... // user_id: number;
  ingre_list: RefrigeratorIngreList[]; // json 데이터에 포함
};

type FridgeStore = {
  fridges: Refrigerator[];
  hasFridge: boolean;
  setFridges: (fridges: Refrigerator[]) => void;
};

const useFridgeStore = create<FridgeStore>()(
  devtools(
    persist(
      (set) => ({
        fridges: [],
        hasFridge: false,
        setFridges: (fridges: Refrigerator[]) =>
          set({ fridges, hasFridge: fridges.length > 0 }),
      }),
      {
        name: 'fridge-store', // 로컬 스토리지에 저장될 이름
      },
    ),
  ),
);

export default useFridgeStore;
