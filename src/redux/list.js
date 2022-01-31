import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name: "list",
  initialState: {
    list: [],
  },
  reducers: {
    addList(state, action) {
      state.list.push(action.payload);
    },
  },
});

export const { addList } = resultSlice.actions;

export default resultSlice.reducer;
