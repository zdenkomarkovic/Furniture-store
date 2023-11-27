import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';

import RootLayout from './RootLayout';
import { appChildren } from './appChildren';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
        children: appChildren,
      },
    ],
  },
]);
