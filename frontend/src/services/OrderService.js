import axios from 'axios';

class OrderService {
  static addOrder = order => axios.post('/order/addOrder', order);
  static allOrders = () => axios.get('/order/allOrders');
}
export default OrderService;
