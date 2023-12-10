import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import productSlice from './productSlice';

export const store = configureStore({
  reducer: {
    userStore: userSlice,
    productStore: productSlice,
  },
});
