import AddProduct from "../Components/AddProduct/AddProduct";
import CategoriesDashboard from "../Components/DashboardComponents/CategoriesDashboard/CategoriesDashboard";
import Orders from "../Components/Orders/Orders";
import { routes } from "./routes";

export const dashboardChildren = [
  {
    path: routes.DASHBOARD.path,
    element: <Orders />,
  },
  {
    path: routes.ADD_PRODUCT.path,
    element: <AddProduct />,
  },
  {
    path: routes.ORDERS.path,
    element: <Orders />,
  },
  {
    path: routes.CATEGORIES_DASHBOARD.path,
    element: <CategoriesDashboard />,
  },
];
