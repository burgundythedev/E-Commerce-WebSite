import { createSlice } from "@reduxjs/toolkit";

const initialState = { filteredProducts: [] };

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_ALPHABET(state, action) {
      const { list, sort } = action.payload;
      let tempProduct = [];

      switch (sort) {
        case "a-z":
          tempProduct = list.slice().sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          break;
        case "z-a":
          tempProduct = list.slice().sort((a, b) => {
            return b.name.localeCompare(a.name);
          });
          break;
        default:
          tempProduct = list;
      }

      state.filteredProducts = tempProduct;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let tempProduct = [];
      if (category === "All") {
        tempProduct = products;
      } else {
        tempProduct = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = tempProduct;
    },
  },
});

export const { FILTER_BY_ALPHABET, FILTER_BY_CATEGORY } = filterSlice.actions;

export const selectFilteredCategories = (state) =>
  state.filter.filteredProducts;

export default filterSlice.reducer;
