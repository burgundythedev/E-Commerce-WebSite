import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    CONNECTED_USER: (state, action) => {
      const { email, userID, userName } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.Id = userID;
    },
    DISCONNECT_USER: (state, action) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userID = null;
      state.userName = null;
    },
  },
});

export const { CONNECTED_USER, DISCONNECT_USER } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserID = (state) => state.auth.userID;
export const selectUserName = (state) => state.auth.userName;
export default authSlice.reducer;
