import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState: any = {
  // Initial state being mainted dynamically
};

export const selectableGridSlice = createSlice({
  name: "selectableGrid",
  initialState: initialState,
  reducers: {
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

    setSearchText: (state: any, action: any) => {
      const name = action.payload?.name;
      if (_.isEmpty(state[name])) {
        state[name] = {};
      }
      state[name].searchText = action.payload?.searchText;
    },

    setSelectedIDs: (state: any, action: any) => {
      const name = action.payload?.name;
      const selectedIDs = _.compact(action.payload?.selectedIDs); // _.compact is used to cleanup undefined values from selectedIDs array. Sometimes due to bug in grid some undefined values are injected in the array which needs to be removed, otherwise throws error
      if (_.isEmpty(state[name])) {
        state[name] = {};
      }
      state[name].selectedIDs = selectedIDs;
    },

    resetSelectedIDs:(state: any, action: any) => {
      const name = action.payload?.name;
      if(state[name]){
        state[name].selectedIDs = [];
      }
    },

    resetSelectableGrid:(state: any, action: any) => {
      const name = action.payload?.name;
      if(state[name]){
        const keys: string[] = Object.keys(state[name]);
        if(keys){
          keys.forEach((key)=>{
            state[name][key] = undefined
          })
        }
      }
    },

    setShowSelectedRows: (state: any, action: any) => {
      const name = action.payload?.name;
      if (_.isEmpty(state[name])) {
        state[name] = {};
      }
      state[name].showSelectedRowsFlag = !!!state[name].showSelectedRowsFlag;
    },

  },
});

const { reducer } = selectableGridSlice;
const {
  resetAllFilters,
  setFiltersVisible,
  setFilterValue,
  setSearchText,
  setSelectedIDs,
  resetSelectedIDs,
  resetSelectableGrid,
  setShowSelectedRows,
} = selectableGridSlice.actions;

export {
  resetAllFilters,
  setFiltersVisible,
  setFilterValue,
  reducer as SelectableGridReducer,
  setSearchText,
  setSelectedIDs,
  resetSelectableGrid,
  resetSelectedIDs,
  setShowSelectedRows,
};
