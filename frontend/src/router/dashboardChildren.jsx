import AddProduct from "../Components/AddProduct/AddProduct";
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
];
