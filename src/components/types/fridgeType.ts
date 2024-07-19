// 냉장고에 추가된 재료 타입
export type RefrigeratorIngre = {
  id: number;
  ingre_name: string;
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
  ingre_list: RefrigeratorIngre[]; // json 데이터에 포함
};

export type Fridges = {
  fridges: Refrigerator[];
  setFridges: (fridges: Refrigerator[]) => void;
};

export type FridgeMode = 'add' | 'edit' | 'delete' | '';
export type BtnType = 'submit' | 'cancel';
