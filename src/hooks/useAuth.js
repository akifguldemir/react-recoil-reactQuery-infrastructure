import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from '../recoil/atoms/authAtom';
import AuthService from '../services/AuthService';

const useAuth = () => {
  const [authState, setAuthState] = useRecoilState(authAtom);

  const login = async (credentials) => {
    try {
      const response = await AuthService.login(credentials);
      setAuthState({
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      return response.data; // Başarılı olduğunda döndürülen değer
    } catch (error) {
      console.error('Login failed', error);
      throw error; // Hata durumunda hata fırlat
    }
  };

  const logout = () => {
    AuthService.logout();
    setAuthState({ user: null, accessToken: null, refreshToken: null });
  };

  const refreshToken = async () => {
    try {
      const response = await AuthService.refreshToken(authState.refreshToken);
      setAuthState((prevState) => ({
        ...prevState,
        accessToken: response.data.accessToken,
      }));
    } catch (error) {
      console.error('Token refresh failed', error);
    }
  };

  useEffect(() => {
    if (authState.refreshToken) {
      const interval = setInterval(() => {
        refreshToken();
      }, 15 * 60 * 1000); // Refresh token every 15 minutes

      return () => clearInterval(interval);
    }
  }, [authState.refreshToken]);

  return { authState, login, logout, refreshToken };
};

export default useAuth;