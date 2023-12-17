import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';

import RootLayout from './RootLayout';
import { appChildren } from './appChildren';
import { routes } from './routes';
import Dashboard from '../Pages/Dashboard/Dashboard';
import { dashboardChildren } from './dashboardChildren';
import AuthGuarding from '../utils/AuthGuarding';

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
      {
        path: routes.DASHBOARD.path,
        element: (
          <AuthGuarding>
            <Dashboard />
          </AuthGuarding>
        ),
        children: dashboardChildren,
      },
    ],
  },
]);
