import BaseService from './BaseService';

class UserService extends BaseService {

  getUser() {
    return this.get('/user/me');
  }

}

export default new UserService('https://dummyjson.com');