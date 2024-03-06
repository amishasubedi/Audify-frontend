import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/user_slice";
import { apiSlice } from "./Services/api_service";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, logger),
});

export default store;
