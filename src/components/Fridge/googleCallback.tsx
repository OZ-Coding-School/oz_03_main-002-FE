import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../../store/useAuthStore';
import { User } from '../../types/userType';

function GoogleCallback() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // JWT 토큰을 서버에서 가져오기
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('jwt='))
          ?.split('=')[1];

        if (!token) {
          throw new Error('No token found');
        }

        // JWT 토큰을 로컬 스토리지에 저장
        localStorage.setItem('jwt', token);

        // JWT 토큰을 이용하여 사용자 정보를 요청
        const response = await axios.get<User>('/api/v1/userinfo', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setUser(response.data);
        navigate('/fridges');
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate, setUser]);

  return <div>로그인 처리 중...</div>;
}

export default GoogleCallback;
