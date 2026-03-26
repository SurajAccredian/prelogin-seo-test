// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { programReducers } from "./reducers/program";
import { userReducers } from "./reducers/user";

const initialState = {
  user: {
    userInfo: null,
    authType: null,
    redirectUrl: null,
    category: null,
    loginType: "user",
    openLoginDrawerState: false,
    authenticated: false,
  },
  program: {
    checkedTags: [],
    checkedCategories: [],
    data: null,
    state: "pending",
    brochureState: false,
    enrollState: false,
    enrollText: "",
    trackerId: null,
    enrollLoderState: false,
  },
};

const store = configureStore({
  reducer: {
    program: programReducers,
    user: userReducers,
  },
  preloadedState: initialState,
});

export default store;
