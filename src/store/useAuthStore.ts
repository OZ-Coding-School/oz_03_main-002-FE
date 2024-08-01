import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axios from '../api/axios';
import { AuthActions, AuthResponse, AuthState } from '../types/userType';

const initialData = {
  user: null,
  token: null,
  loading: false,
  error: null,
  status: null,
};

const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialData,

        // 회원가입
        signUp: async (id, username, email, saltedPassword, salt) => {
          set({ loading: true, error: '' });
          try {
            const response = await axios.post<AuthResponse>('/signup', {
              id,
              username,
              email,
              password: saltedPassword,
              salt,
            });
            set({
              token: response.data.token,
              loading: false,
              status: '회원가입 성공',
            });
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
          }
        },

        // 로그인
        login: async (id, hashedPassword) => {
          set({ loading: true, error: '' });
          try {
            const response = await axios.post<AuthResponse>('/login', {
              id,
              password: hashedPassword,
            });
            set({
              token: response.data.token,
              loading: false,
              status: '로그인 성공',
            });
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
          }
        },

        // 로그아웃
        logout: async () => {
          set({ user: null, token: null, status: '로그아웃 성공' });
          // try {
          //   const response = await axios.post('/logout');
          //   set({ user: null, token: null, status: '로그아웃 성공' });
          // } catch (error) {
          //   const err = error as Error;
          //   set({ error: err.message, loading: false });
          // }
        },
        googleLogin: async () => {
          set({ loading: true, error: '' });
          try {
            const response = await axios.post<AuthResponse>(
              'https://api.naengttogi.com/api/v1/google/login/',
            );
            set({
              token: response.data.token,
              loading: false,
              status: '로그인 성공',
            });
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
          }
        },
        // 상태 업데이트 액션
        // setId: (id: string) =>
        //   set((state) => ({
        //     user: state.user ? { ...state.user, id } : null,
        //   })),
        // setUsername: (username: string) =>
        //   set((state) => ({
        //     user: state.user ? { ...state.user, username } : null,
        //   })),
        // setEmail: (email: string) =>
        //   set((state) => ({
        //     user: state.user ? { ...state.user, email } : null,
        //   })),
        // setPassword: (password: string) =>
        //   set((state) => ({
        //     user: state.user ? { ...state.user, password } : null,
        //   })),
      }),
      {
        name: 'auth-storage',
      },
    ),
  ),
);

export default useAuthStore;
