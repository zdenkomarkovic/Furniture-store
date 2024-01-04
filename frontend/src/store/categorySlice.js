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
    // deleteSingleCategory: (state, action) => {
    //   state.categories = state.categories.filter((cat) => {
    //     cat._id !== action.payload;
    //   });
    // },
  },
});
export const { setAllCategories, deleteSingleCategory } = categorySlice.actions;
export default categorySlice.reducer;
