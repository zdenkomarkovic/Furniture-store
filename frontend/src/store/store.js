import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import productSlice from './productSlice';
import cartSlice from './cartSlice';
import orderSlice from './orderSlice';

export const store = configureStore({
  reducer: {
    userStore: userSlice,
    productStore: productSlice,
    cartStore: cartSlice,
    orderStore: orderSlice,
  },
});
