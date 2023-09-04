import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: [],
  totalOrderAmount: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
      state.orderHistory = action.payload;
    },
    CALCULATE_TOTAL_ORDER(state, action) {
      const array = [];
      state.orderHistory.map((item) => {
        const { orderAmount } = item;
        return array.push(orderAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalOrderAmount = totalAmount;
    },
    UPDATE_ORDER_STATUS(state, action) {
      const { id, status } = action.payload;

      state.orderHistory = state.orderHistory.map((order) =>
        order.id === id ? { ...order, orderStatus: status } : order
      );
    },
  },
});

export const { STORE_ORDERS, CALCULATE_TOTAL_ORDER, UPDATE_ORDER_STATUS } =
  orderSlice.actions;

export const selectOrderHistory = (state) => state.orders.orderHistory;
export const selectOrderAmount = (state) => state.orders.totalOrderAmount;

export default orderSlice.reducer;
