import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from '../App';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home';
import About from './../Pages/About/About';
import Products from '../Pages/Products/Products';
import Contact from '../Pages/Contact/Contact';
import Stores from '../Pages/Stores/Stores';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'stores',
        element: <Stores />,
      },
    ],
  },
]);
