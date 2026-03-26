// store/reducers/program.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  checkedTags: [],
  checkedCategories: [],
  data: null,
  state: "pending",
  brochureState: false,
  enrollState: false,
  enrollText: "",
  trackerId: null,
  enrollLoderState: false,
};

const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    setCheckedCategories: (state, action) => {
      state.checkedCategories = action.payload;
    },
    setCheckedTags: (state, action) => {
      state.checkedTags = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setBrochureState: (state, action) => {
      state.brochureState = action.payload;
    },
    setEnrollState: (state, action) => {
      state.enrollState = action.payload;
    },
    setEnrollText: (state, action) => {
      state.enrollText = action.payload;
    },
    setTracker: (state, action) => {
      state.trackerId = action.payload;
    },
    setEnrollLoaderState: (state, action) => {
      state.enrollLoderState = action.payload;
    },
  },
});

const programReducers = programSlice.reducer;
const programActions = programSlice.actions;

export { programReducers, programActions };
