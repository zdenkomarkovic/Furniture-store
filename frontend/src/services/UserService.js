import axios from 'axios';

class UserService {
  static register = body => axios.post('/user/register', body);
  static getUser = body => axios.post('/user', body);
}
export default UserService;
