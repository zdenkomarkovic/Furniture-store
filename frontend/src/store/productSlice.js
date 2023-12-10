import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
  },
  reducers: {
    storeAllProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});
export const { storeAllProducts } = productSlice.actions;
export default productSlice.reducer;
