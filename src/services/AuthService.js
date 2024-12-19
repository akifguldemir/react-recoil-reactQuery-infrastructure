import BaseService from "./BaseService";

class AuthService extends BaseService {
  constructor() {
    super("/api/auth");
  }

  login(credentials) {
    return this.post("/login", credentials);
  }

  logout() {
    return this.post("/logout");
  }

  refreshToken() {
    return this.post("/refresh-token");
  }
}

export default new AuthService();