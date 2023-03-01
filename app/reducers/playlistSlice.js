import { createSlice } from "@reduxjs/toolkit";

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlistId: "",
    playlistName: "",
    playlistTracks: [],
  },
  reducers: {
    setPlaylistId: (state, action) => {
      state.playlistId = action.payload;
    },
    setPlaylistName: (state, action) => {
      state.playlistName = action.payload;
    },
    setPlaylistTracks: (state, action) => {
      state.playlistTracks = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlaylistId, setPlaylistName, setPlaylistTracks } =
  playlistSlice.actions;

// Selectors
export const selectPlaylistId = (state) => state.playlist.playlistId;
export const selectPlaylistName = (state) => state.playlist.playlistName;
export const selectPlaylistTracks = (state) => state.playlist.playlistTracks;

export default playlistSlice.reducer;
