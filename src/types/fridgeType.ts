// 냉장고에 추가된 재료 타입
export type RefrigeratorIngre = {
  id: number;
  ingreName: string;
  quantity: number;
  registrationDate: string;
  expirationDate: string;
  category: string;
  weight?: number;
};

// 사용자의 냉장고
export type Refrigerator = {
  id: number;
  fridgeName: string; // TODO 백엔드에 항목 추가 요청해야함
  createAt: string;
  updateAt: string;
  isActivate: boolean;
  userId: string;
  ingreList: RefrigeratorIngre[];
};

export type Fridges = {
  setFridges: (fridges: Refrigerator[]) => void;
};

export type FridgeActions = {
  addFridge: (fridge: Refrigerator) => void;
  editFridge: (fridge: Refrigerator) => void;
  deleteFridge: () => void;
};

export type RefrigeratorMode = 'add' | 'edit' | 'delete' | '';

// FridgeState 타입 정의
export type FridgeState = {
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
