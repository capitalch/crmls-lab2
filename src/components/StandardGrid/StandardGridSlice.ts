import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState: any = {
  // Initial state being mainted dynamically
};

export const standardGridSlice = createSlice({
  name: "standardGrid",
  initialState: initialState,
  reducers: {
    addRow: (state: any, action: any) => {
      const name = action.payload.name;
      const row = action.payload.row;
      if (_.isEmpty(state[name])) {
        state[name] = {};
      }
      if (!state[name].allRows) {
        state[name].allRows = [];
      }
      state[name].allRows.push(row);
    },

    deleteRowOnIndex: (state: any, action: any) => {
      const name = action.payload.name;
      const index = action.payload.index;
      if (_.isEmpty(state[name])) {
        state[name] = {};
      }
      const allRows = state[name].allRows;
      const deleteRowIndex = allRows.findIndex(
        (row: any) => row.index === index
      );
      if (deleteRowIndex !== undefined) {
        allRows.splice(deleteRowIndex, 1);
      }
      allRows.forEach((row: any, index: number) => (row.index = index + 1));

      if (state[name]?.currentRow?.index === index) {
        state[name].currentRow = undefined;
      }
    },

    loadAllRows: (state: any, action: any) => {
      const name = action.payload.name;
      const allRows = action.payload.allRows;
      state[name] = {};
      state[name].allRows = allRows;
    },

    resetAllRows: (state: any, action: any) => {
      const name = action.payload.name;
      if (_.isEmpty(state[name])) {
        state[name] = {};
      }
      if (state[name]?.allRows) {
        state[name].allRows = [];
      }
    },

    resetStandardGridRows: (state: any, action: any) => {
      const keys: string[] = Object.keys(state);
      if(keys){
        keys.forEach((key)=>{
          state[key].allRows = []
        })
      }
    },

    resetCurrentRow: (state: any, action: any) => {
      const name = action.payload.name;
      if (_.isEmpty(state[name])) {
        state[name] = {};
      }
      state[name].currentRow = undefined;
    },

    setCurrentRow: (state: any, action: any) => {
      const name = action.payload.name;
      const currentRow = action.payload.currentRow;
      if (_.isEmpty(state[name])) {
        state[name] = {};
      }
      state[name].currentRow = currentRow;
    },

    setFieldValueForAllRows: (state: any, action: any) => {
      const name = action.payload.name;
      const fieldName = action.payload.fieldName;
      const fieldValue = action.payload.fieldValue;
      state[name]?.allRows.forEach((row: any) => {
        row[fieldName] = fieldValue;
      });
    },

    // deleteRowOnId: (state: any, action: any) => {
    //   const name = action.payload.name;
    //   const id = action.payload.id;
    //   if (_.isEmpty(state[name])) {
    //     state[name] = {};
    //   }
    //   const allRows = state[name].allRows;
    //   const deleteRowIndex = allRows.findIndex((row: any) => row.id === id);
    //   if (deleteRowIndex !== undefined) {
    //     allRows.splice(deleteRowIndex, 1);
    //   }

    //   if (state[name]?.currentRow?.id === id) {
    //     state[name].currentRow = undefined;
    //   }
    // },

    updateRow: (state: any, action: any) => {
      const name = action.payload.name;
      const row = action.payload.row;
      const index = row.index;
      const allRows = state[name].allRows;
      const updateRowIndex = allRows.findIndex(
        (row: any) => row.index === index
      );
      allRows[updateRowIndex] = row;
    },
  },
});

const { reducer } = standardGridSlice;
const {
  addRow,
  loadAllRows,
  resetAllRows,
  setCurrentRow,
  setFieldValueForAllRows,
  resetCurrentRow,
  resetStandardGridRows,
  // deleteRowOnId,
  deleteRowOnIndex,
  updateRow,
} = standardGridSlice.actions;
export {
  addRow,
  loadAllRows,
  resetAllRows,
  setCurrentRow,
  setFieldValueForAllRows,
  resetCurrentRow,
  resetStandardGridRows,
  // deleteRowOnId,
  deleteRowOnIndex,
  updateRow,
  reducer as standardGridReducer,
};
