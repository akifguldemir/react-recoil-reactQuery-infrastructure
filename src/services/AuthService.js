import BaseService from './BaseService';

class AuthService extends BaseService {
  login(credentials) {
    return this.post('/auth/login', credentials);
  }

  logout() {
    return this.post('/auth/logout');
  }

  refreshToken(token) {
    return this.post('/auth/refresh-token', { token });
  }
}

export default new AuthService('/api');