import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axios from 'axios';

// User 타입 정의
interface User {
  id: string;
  username: string;
  email: string;
}

// AuthState 타입 정의
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  status: string | null;
}

// AuthActions 타입 정의
interface AuthActions {
  signUp: (
    id: string,
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  login: (id: string, password: string) => Promise<void>;
  logout: () => void;
  setId: (id: string) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        loading: false,
        error: null,
        status: null,

        // 회원가입
        signUp: async (id, username, email, password) => {
          set({ loading: true, error: null });
          try {
            const response = await axios.post('/api/signup', {
              id,
              username,
              email,
              password,
            });
            set({
              token: response.data.token,
              loading: false,
              status: '회원가입 성공',
            });
          } catch (error) {
            const err = error as Error;
            set({ error: err.message, loading: false });
          }
        },

        // 로그인
        login: async (id, password) => {
          set({ loading: true, error: null });
          try {
            const response = await axios.post('/api/login', { id, password });
            set({
              token: response.data.token,
              loading: false,
              status: '로그인 성공',
            });
          } catch (error) {
            const err = error as Error;
            set({ error: err.message, loading: false });
          }
        },

        // 로그아웃
        logout: () => {
          set({ user: null, token: null, status: '로그아웃 성공' });
        },

        // 상태 업데이트 액션
        setId: (id: string) =>
          set((state) => ({
            user: state.user ? { ...state.user, id } : null,
          })),
        setUsername: (username: string) =>
          set((state) => ({
            user: state.user ? { ...state.user, username } : null,
          })),
        setEmail: (email: string) =>
          set((state) => ({
            user: state.user ? { ...state.user, email } : null,
          })),
        setPassword: (password: string) =>
          set((state) => ({
            user: state.user ? { ...state.user, password } : null,
          })),
      }),
      {
        name: 'auth-storage',
      },
    ),
  ),
);

export default useAuthStore;
