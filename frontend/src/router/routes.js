export const routes = {
  HOME: { path: "/", name: "Home" },
  ABOUT: { path: "/about", name: "About" },
  PRODUCTS: { path: "/products", name: "Products" },
  CONTACT: { path: "/contact", name: "Contact" },
  STORES: { path: "/stores", name: "Stores" },
  PRODUCT_DETAIL: { path: "/product/:id", realPath: (id) => "/product/" + id },
  REGISTER: { path: "/register", name: "Register" },
  ACTIVATE_ACCOUNT: { path: "/activate/:id" },
  LOGIN: { path: "/login", name: "Login" },
  DASHBOARD: { path: "/dashboard", name: "Dashboard" },
  ADD_PRODUCT: { path: "addProduct", name: "Add Product" },
  ORDERS: { path: "orders", name: "Orders" },
  SINGLE: { path: "/single/:id" },
  CHECKOUT: { path: "/checkout" },
};

export const mainNavbarItem = [
  routes.HOME,
  routes.ABOUT,
  routes.PRODUCTS,
  routes.CONTACT,
  routes.STORES,
];

export const dashboardSidebarItem = [
  routes.HOME,
  routes.ORDERS,
  routes.ADD_PRODUCT,
  routes.REGISTER,
];
