import axios from 'axios';

class ProductService {
  static getAllProducts = () => axios.get('/product/getAllProducts');
  static pagination = (limit, page) => axios.get(`/product/${limit}/${page}`);

  static addProduct = product => axios.post('/product/addProduct', product);
}
export default ProductService;
