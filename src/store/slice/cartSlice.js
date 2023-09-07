import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalItems: 0,
  cartTotalAmountPrice: 0,
  prevUrl: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success("Product added to Cart", { position: "top-left" });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_FROM_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        if (state.cartItems[productIndex].cartQuantity > 1) {
          state.cartItems[productIndex].cartQuantity -= 1;
        } else {
          state.cartItems.splice(productIndex, 1);
          toast.warning("Product removed from Cart", { position: "top-left" });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    REMOVE_FROM_CART(state, action) {
      const productId = action.payload.id;
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === productId
      );

      if (productIndex >= 0) {
        state.cartItems.splice(productIndex, 1);
        toast.error("Product removed from Cart", { position: "top-left" });
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    CLEAR_CART(state) {
      state.cartItems = [];
      state.cartTotalItems = 0;
      localStorage.removeItem("cartItems");
    },
    SUBTOTAL_CALCULATOR(state) {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmountPrice = totalAmount;
    },
    SUBTOTAL_ITEM_CALCULATOR(state) {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const cartItemQuantity = cartQuantity;
        return array.push(cartItemQuantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalItems = totalQuantity;
    },
    SAVE_URL(state, action) {
      state.prevUrl = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_FROM_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SUBTOTAL_CALCULATOR,
  SUBTOTAL_ITEM_CALCULATOR,
  SAVE_URL,
} = cartSlice.actions;

export const selectCartProducts = (state) => state.cart.cartItems;
export const selectCartTotalItems = (state) => state.cart.cartTotalItems;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmountPrice;
export const selectPrevUrl = (state) => state.cart.prevUrl;
export default cartSlice.reducer;
