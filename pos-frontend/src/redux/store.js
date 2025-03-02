import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customerSlice";

const store = configureStore({
  reducer: {
    customer: customerSlice,
  },
});

export default store;
