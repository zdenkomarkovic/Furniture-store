export const routes = {
  HOME: { path: '/', name: 'Home' },
  ABOUT: { path: '/about', name: 'About' },
  PRODUCTS: { path: '/products', name: 'Products' },
  CONTACT: { path: '/contact', name: 'Contact' },
  STORES: { path: '/stores', name: 'Stores' },
  PRODUCT_DETAIL: { path: '/product/:id', realPath: id => '/product/' + id },
  REGISTER: { path: '/register', name: 'Register' },
};

export const mainNavbarItem = [
  routes.HOME,
  routes.ABOUT,
  routes.PRODUCTS,
  routes.CONTACT,
  routes.STORES,
  routes.REGISTER,
];
