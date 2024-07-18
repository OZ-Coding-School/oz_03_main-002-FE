export type Ingredient = {
  id: number;
  name: string;
  major_code: number;
  middle_code?: number;
  sub_code?: number;
};

export type ingre_sub = {
  id: number;
  name: string;
  parent_id: number; // TODO 상위와 코드 맞추어야함
};
