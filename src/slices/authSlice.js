import { createSlice } from "@reduxjs/toolkit";

// authSlice tot store info about the logged in user
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // To set the details of logged in user
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    // function to logout
    logout: (state) => {
      (state.userInfo = null), localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
