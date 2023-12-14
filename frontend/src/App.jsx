import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import axios from 'axios';
import UserService from './services/userService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './Components/Cart/Cart';
import { useState } from 'react';

axios.defaults.baseURL = 'http://localhost:4000/';

function App() {
  const [cartDisplay, setCartDisplay] = useState(false);

  return (
    <>
      <Navbar setCartDisplay={setCartDisplay} />
      {cartDisplay && <Cart setCartDisplay={setCartDisplay} />}
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
