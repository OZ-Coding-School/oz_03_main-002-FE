// 냉장고에 추가된 재료 타입
export type RefrigeratorIngre = {
  id: string;
  ingreName: string;
  quantity: number;
  registrationDate?: string;
  expirationDate: string;
  category?: string;
  weight?: number;
};

// 사용자의 냉장고
export type Refrigerator = {
  id: string;
  fridgeName: string; // TODO 백엔드에 항목 추가 요청해야함
  ingreList: RefrigeratorIngre[];
  createAt: string;
  updateAt: string;
  isActivate?: boolean;
  userId?: string;
};

export type Fridges = {
  setFridges: (fridges: Refrigerator[]) => void;
};

// export type FridgeActions = {
//   addFridge: (data: { fridgeName: string }) => void;
//   editFridge: (fridge: Refrigerator) => void;
//   deleteFridge: () => void;
// };

export type RefrigeratorMode = 'add' | 'edit' | 'delete' | '';

// FridgeState 타입 정의
export type FridgeState = {
  fridges: Refrigerator[];
  showModal: boolean;
  currentMode: RefrigeratorMode;
  fetchFridges: () => Promise<void>;
  setShowModal: (show: boolean) => void;
  setCurrentMode: (mode: RefrigeratorMode) => void;
  addFridge: (data: { fridgeName: string }) => Promise<void>;
  updateFridge: (
    refrigerator: Omit<Refrigerator, 'updatedAt'>,
  ) => Promise<void>;
  deleteFridge: (id: string) => Promise<void>;
};
