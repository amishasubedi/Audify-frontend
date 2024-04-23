import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/user_slice";
import playerReducer from "./Features/player_slice";
import alertReducer from "./Features/alert_slice";
import { apiSlice, authApiSlice } from "./Services/api_service";

import logger from "redux-logger";

const store = configureStore({
  reducer: {
    auth: userReducer,
    player: playerReducer,
    alert: alertReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware, authApiSlice.middleware)
      .concat(logger),
});

export default store;
