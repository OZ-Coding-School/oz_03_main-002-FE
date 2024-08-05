// User 타입 정의
export type User = {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
};

// AuthState 타입 정의
export type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  status: string | null;
};

// AuthActions 타입 정의
export type AuthActions = {
  // fetchUser: () => Promise<AuthState>;
  signUp: (
    id: string,
    password: string,
    username: string,
    email: string,
    salt: string,
  ) => Promise<void>;
  login: (id: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;

  // setId: (id: string) => void;
  // setUsername: (username: string) => void;
  // setEmail: (email: string) => void;
  // setPassword: (password: string) => void;
};

// API 응답 타입
export type AuthResponse = {
  token: string;
  user: User;
};
