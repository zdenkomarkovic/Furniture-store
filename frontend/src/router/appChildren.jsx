import About from '../Pages/About/About';
import ActivateAccountPage from '../Pages/ActivateAccountPage/ActivateAccountPage';
import Contact from '../Pages/Contact/Contact';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Products from '../Pages/Products/Products';
import Register from '../Pages/Register/Register';
import Stores from '../Pages/Stores/Stores';
import { routes } from './routes';

export const appChildren = [
  {
    path: routes.HOME.path,
    element: <Home />,
  },
  {
    path: routes.ABOUT.path,
    element: <About />,
  },
  {
    path: routes.PRODUCTS.path,
    element: <Products />,
  },
  {
    path: routes.CONTACT.path,
    element: <Contact />,
  },
  {
    path: routes.STORES.path,
    element: <Stores />,
  },
  {
    path: routes.REGISTER.path,
    element: <Register />,
  },
  {
    path: routes.ACTIVATE_ACCOUNT.path,
    element: <ActivateAccountPage />,
  },
  {
    path: routes.LOGIN.path,
    element: <Login />,
  },
];
