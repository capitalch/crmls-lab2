import { createSlice } from "@reduxjs/toolkit";

export const standardSelectSlice = createSlice({
  name: "standardSelect",
  initialState: {},
  reducers: {
    standardSelectOnChange: (state: any, action: any) => {
      const name = action?.payload?.name;
      const selectedId = action?.payload?.selectedId;
      const selectedName = action?.payload?.selectedName;
      state[name] = {};
      state[name].selectedId = selectedId;
      state[name].selectedName = selectedName;
    },

    standardSelectReset: (state: any, action: any) => {
      const name = action?.payload?.name;
      if (state[name]) {
        state[name].selectedID = "";
        state[name].selectedName = "";
      }
    },
  },
});
const { reducer } = standardSelectSlice;
export { reducer as standardSelectReducer };
export const { standardSelectOnChange, standardSelectReset } = standardSelectSlice.actions;
