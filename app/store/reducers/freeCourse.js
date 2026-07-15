import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  state: "pending",
  isEnrolled: false,
  enrollLoader: false,
};

const freeCourseSlice = createSlice({
  name: "freeCourse",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setIsEnrolled: (state, action) => {
      state.isEnrolled = action.payload;
    },
    setEnrollLoader: (state, action) => {
      state.enrollLoader = action.payload;
    },
  },
});

const freeCourseReducers = freeCourseSlice.reducer;
const freeCourseActions = freeCourseSlice.actions;

export { freeCourseReducers, freeCourseActions };
