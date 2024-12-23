import BaseService from './BaseService';

class ProductService extends BaseService {
  getProducts(page, itemsPerPage) {
    return this.get(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${page}`);
  }
}

export default new ProductService('/api');