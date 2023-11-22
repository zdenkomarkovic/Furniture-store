import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import axios from 'axios';
import UserService from './services/userService';

axios.defaults.baseURL = 'http://localhost:4000/';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
