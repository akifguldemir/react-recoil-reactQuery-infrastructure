import BaseService from './BaseService';

class AuthService extends BaseService {
  login(credentials) {
    return this.post('https://localhost:44373/api/Auth/login', credentials);
  }

  logout() {
    return this.post('/auth/logout');
  }

  refreshToken(token) {
    return this.post('https://dummyjson.com/auth/refresh', { token });
  }
}

export default new AuthService('/api');