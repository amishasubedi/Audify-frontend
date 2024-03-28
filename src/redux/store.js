import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/user_slice";
import playerReducer from "./Features/player_slice";
import alertReducer from "./Features/alert_slice";
import playlistReducer from "./Features/playlist_slice";
import { apiSlice } from "./Services/api_service";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    auth: userReducer,
    player: playerReducer,
    alert: alertReducer,
    playlist: playlistReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, logger),
});

export default store;
