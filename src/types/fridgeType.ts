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
  ingreList: RefrigeratorIngre[]; // json 데이터에 포함
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
export type BtnType = 'submit' | 'cancel';

// FridgeState 타입 정의
export type FridgeState = {
  fridges: Refrigerator[];
  showModal: boolean;
  currentMode: RefrigeratorMode;
  setShowModal: (show: boolean) => void;
  setCurrentMode: (mode: RefrigeratorMode) => void;
  addFridge: (fridge: Refrigerator) => void;
  updateFridge: (fridge: Refrigerator) => void;
  deleteFridge: (id: number) => void;
};

// FridgeActions 타입 정의
// interface FridgeActions {
//   updateFridgeName: (id: string, fridge_name: string) => Promise<void>;
// }
