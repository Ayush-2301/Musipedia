import { configureStore } from "@reduxjs/toolkit";
import { shazamCoreApi } from "./services/shazamCore";
import { geniusCoreApi } from "./services/geniusCore";
import playerReducer from "./features/playerSlice";
import colorReducer from "./features/colorSlice";
export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    [geniusCoreApi.reducerPath]: geniusCoreApi.reducer,
    player: playerReducer,
    color: colorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      shazamCoreApi.middleware,
      geniusCoreApi.middleware
    ),
});
