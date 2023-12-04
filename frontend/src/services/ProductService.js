import axios from 'axios';

class ProductService {
  static pagination = (limit, page) => axios.get(`/products/${limit}/${page}`);
}
export default ProductService;
