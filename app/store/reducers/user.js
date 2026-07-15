// store/reducers/user.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  authType: null,
  redirectUrl: null,
  category: null,
  isfreeCourse: false,
  loginType: "user",
  program_id: null,
  openLoginDrawerState: false,
  authenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    openLoginModal: (state, action) => {
      if (action.payload === "signup") {
        state.authType = "signup";
      } else if (action.payload === "existingUser") {
        state.authType = "loginsuccess";
      } else {
        state.authType = action.payload;
      }
    },
    setLoginOpenFromProgramPage: (
      state,
      action,
    ) => {
      state.category = action.payload;
    },
    setLoginOpenFromFreeProgramPage: (
      state,
      action,
    ) => {
      state.isfreeCourse = action.payload?.isFreeCourse;
      state.program_id = action.payload?.program_id;
    },
    setDrawerState: (state, action) => {
      state.openLoginDrawerState = action.payload;
    },
    setLoginType: (state, action) => {
      state.loginType = action.payload;
    },
    setRedirectUrl: (state, action) => {
      state.redirectUrl = action.payload;
    },
    clearRedirectUrl: (state) => {
      state.redirectUrl = null;
    },
    setAuthenticatedState: (state, action) => {
      state.authenticated = action.payload;
    },
  },
});

const userReducers = userSlice.reducer;
const userActions = userSlice.actions;

export { userReducers, userActions };
