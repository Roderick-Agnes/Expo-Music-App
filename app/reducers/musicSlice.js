import { createSlice } from "@reduxjs/toolkit";
import { getAudioUrlFromServer } from "../../utils/helpers";

const initialState = {
  genres: [],
  playlists: [],
  tracks: [],
  trackIndex: null,
  trackIsPlaying: {
    trackId: null,
    track: null,
    trackUrl: null,
  },
  topTracks: [],
  topArtists: [],
  topAlbums: [],
};



export const musicSlice = createSlice({
  name: "music",
  initialState: {
    genres: [],
    playlists: [],
    tracks: [],
    trackIndex: null,
    trackIsPlaying: {
      trackId: null,
      track: null,
      trackUrl: null,
    },
    topTracks: [],
    topArtists: [],
    topAlbums: [],
  },
  reducers: {
    setGenres: (state, { payload }) => {
      state.genres = payload?.genres;
    },
    setPlaylists: (state, { payload }) => {
      const genre = state.genres.find((item) => item.id === payload?.id);
      const playlist = genre.contents?.items;
      state.playlists = playlist;
    },
    setTracks: (state, { payload }) => {
      state.tracks = payload?.contents.items;
    },
    setTrackIndex: (state, { payload }) => {
      state.trackIndex = payload;
    },
    setTrackIdIsPlaying: (state, { payload }) => {
      state.trackIsPlaying.trackId = payload;
      console.log("trackIdIsPlaying: ", payload);
    },
    setTrackIsPlaying: (state, { payload }) => {
      state.trackIsPlaying.track = payload;
    },
    setTrackUrlIsPlaying: (state, { payload }) => {
      state.trackIsPlaying.trackUrl = payload;
    },
    setTopTracks: (state, { payload }) => {
      state.topTracks = payload;
    },
    setTopArtists: (state, { payload }) => {
      state.topArtists = payload;
    },
    setTopAlbums: (state, { payload }) => {
      state.topAlbums = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setGenres,
  setPlaylists,
  setTracks,
  setTrackIndex,
  setTrackIdIsPlaying,
  setTrackIsPlaying,
  setTrackUrlIsPlaying,
  setTopTracks,
  setTopArtists,
  setTopAlbums,
} = musicSlice.actions;

// Selectors
export const selectGenres = (state) => state.music.genres;
export const selectPlaylists = (state) => state.music.playlists;
export const selectTracks = (state) => state.music.tracks;
export const selectTrackIndex = (state) => state.music.trackIndex;
export const selectTrackIsPlaying = (state) => state.music.trackIsPlaying;
export const selectTopTracks = (state) => state.music.topTracks;
export const selectTopArtists = (state) => state.music.topArtists;
export const selectTopAlbums = (state) => state.music.topAlbums;

export default musicSlice.reducer;
