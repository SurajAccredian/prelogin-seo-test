// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { programReducers } from "./reducers/program";
import { userReducers } from "./reducers/user";
import { freeCourseReducers } from "./reducers/freeCourse";

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
    checkedDurations: [],
    checkedInstitutes: [],
    checkedCareerLevels: [],
    data: null,
    state: "pending",
    brochureState: false,
    enrollState: false,
    enrollText: "",
    trackerId: null,
    enrollLoderState: false,
  },
  freeCourse: {
    data: null,
    state: "pending",
    isEnrolled: false,
    enrollLoader: false,
  },
};

const store = configureStore({
  reducer: {
    program: programReducers,
    user: userReducers,
    freeCourse: freeCourseReducers,
  },
  preloadedState: initialState,
});

export default store;
