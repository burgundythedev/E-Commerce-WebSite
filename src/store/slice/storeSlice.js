import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const storeSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
      state.products = action.payload.products;
    },
  },
});

export const { STORE_PRODUCTS } = storeSlice.actions;
export const selectProduct = (state) => state.product.products;
export default storeSlice.reducer;
