import axios from "axios";

class BaseService {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.client.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const storedAuthState = localStorage.getItem('authState');
          if (storedAuthState) {
            const { refreshToken } = JSON.parse(storedAuthState);
            try {
              const response = await this.client.post('/auth/refresh', { refreshToken });
              const newAuthState = {
                ...JSON.parse(storedAuthState),
                accessToken: response.data.accessToken,
              };
              localStorage.setItem('authState', JSON.stringify(newAuthState));
              this.setAuthToken(response.data.accessToken);
              originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
              return this.client(originalRequest);
            } catch (refreshError) {
              console.error('Refresh token failed', refreshError);
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  get(url, config = {}) {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      const { accessToken } = JSON.parse(storedAuthState);
      this.setAuthToken(accessToken);
    }
    return this.client.get(url, config);
  }

  post(url, data, config = {}) {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      const { accessToken } = JSON.parse(storedAuthState);
      this.setAuthToken(accessToken);
    }
    return this.client.post(url, data, config);
  }

  put(url, data, config = {}) {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      const { accessToken } = JSON.parse(storedAuthState);
      this.setAuthToken(accessToken);
    }
    return this.client.put(url, data, config);
  }

  delete(url, config = {}) {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      const { accessToken } = JSON.parse(storedAuthState);
      this.setAuthToken(accessToken);
    }
    return this.client.delete(url, config);
  }
}

export default BaseService;