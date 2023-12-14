import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
  },
  reducers: {
    storeAllOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { storeAllOrders } = orderSlice.actions;
export default orderSlice.reducer;
