import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    setAllCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});
export const { setAllCategories } = categorySlice.actions;
export default categorySlice.reducer;
