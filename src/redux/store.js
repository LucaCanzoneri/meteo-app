import { configureStore } from "@reduxjs/toolkit";
import list from "./list";

const store = configureStore({
  reducer: {
    list,
  },
});

export default store;
