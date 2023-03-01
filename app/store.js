import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./reducers/musicSlice";
import playlistReducer from "./reducers/playlistSlice";

export const store = configureStore({
  reducer: {
    music: musicReducer,
    playlist: playlistReducer,
  },
});
