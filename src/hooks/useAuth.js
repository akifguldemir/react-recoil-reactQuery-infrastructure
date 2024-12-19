import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from '../recoil/atoms/authAtom';
import AuthService from '../services/AuthService';

const useAuth = () => {
  const [authState, setAuthState] = useRecoilState(authAtom);

  useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      setAuthState(JSON.parse(storedAuthState));
    }
  }, [setAuthState]);

  const login = async (credentials) => {
    try {
      const response = await AuthService.login(credentials);
      const newAuthState = {
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        isAuthenticated: true,
      };
      setAuthState(newAuthState);
      localStorage.setItem('authState', JSON.stringify(newAuthState));
      return response.data;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    const newAuthState = {
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    };
    setAuthState(newAuthState);
    localStorage.removeItem('authState');
  };

  const refreshToken = async () => {
    try {
      const response = await AuthService.refreshToken(authState.refreshToken);
      const newAuthState = {
        ...authState,
        accessToken: response.data.accessToken,
      };
      setAuthState(newAuthState);
      localStorage.setItem('authState', JSON.stringify(newAuthState));
    } catch (error) {
      console.error('Token refresh failed', error);
    }
  };

  return { authState, login, logout, refreshToken };
};

export default useAuth;