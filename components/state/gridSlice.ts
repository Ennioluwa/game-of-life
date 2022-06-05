import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  rows: 20,
  columns: 20,
};
const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    rowSet: (state, action) => {
      return { ...state, rows: action.payload };
    },
    columnSet: (state, action) => {
      return { ...state, columns: action.payload };
    },
  },
});

export const { rowSet, columnSet } = gridSlice.actions;

export default gridSlice.reducer;
