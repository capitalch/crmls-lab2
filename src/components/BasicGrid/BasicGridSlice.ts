import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  // Initial state being mainted dynamically
};

export const basicGridSlice = createSlice({
  name: "basicGrid",
  initialState: initialState,

  reducers: {
    resetAll: (state: any, action: any) => {
      const name = action.payload.name;
      state[name] = {};
    },
    resetAllFilters: (state: any, action: any) => {
      const name = action.payload.name;
      const filterNames: string[] = action.payload.filterNames;
      if (_.isEmpty(filterNames)) {
        return;
      }
      filterNames.forEach((filterName) => {
        if (state[name]?.[filterName]?.selectedValue) {
          state[name][filterName].selectedValue = "";
        }
      });
    },

    setFiltersVisible: (state: any, action: any) => {
      const pl = action.payload;
      const name = pl.name;
      const areFiltersVisible = pl.areFiltersVisible;
      if (_.isEmpty(state[name])) {
        state[name] = {};
      }
      state[name].areFiltersVisible = areFiltersVisible;
    },

    setFilterValue: (state: any, action: any) => {
      const selectFilterObject = action.payload;
      const name = selectFilterObject.name;
      const filterName = selectFilterObject.filterName; // name for select filter
      const selectedValue = selectFilterObject.selectedValue;
      if (!state[name][filterName]) {
        state[name][filterName] = {};
      }
      state[name][filterName].selectedValue = selectedValue;
    },

    setSearchTextValue: (state: any, action: any) => {
      const searchObject = action.payload;
      const name = searchObject.name;
      const searchTextValue = searchObject.searchTextValue;
      if (!state[name]) {
        state[name] = {};
      }
      state[name].searchTextValue = searchTextValue;
    },
  },
});

const { reducer } = basicGridSlice;
const {
  resetAll,
  resetAllFilters,
  setFiltersVisible,
  setFilterValue,
  setSearchTextValue,
} = basicGridSlice.actions;
export {
  reducer as BasicGridReducer,
  resetAll,
  resetAllFilters,
  setFiltersVisible,
  setFilterValue,
  setSearchTextValue,
};
