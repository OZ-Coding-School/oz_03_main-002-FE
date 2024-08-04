import axios from 'axios';
// import useAuthStore from '../store/useAuthStore';

const instance = axios.create({
  baseURL: 'https://api.naengttogi.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// instance.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore.getState().token;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       console.warn('No token available');
//       window.location.href = '/login';
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export default instance;
