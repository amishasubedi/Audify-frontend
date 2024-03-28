import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  selectedListId: null,
  isPrivate: false,
  allowPlaylistAudioRemove: false,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    updatePlaylistVisibility(playlistState, { payload }) {
      playlistState.visible = payload;
    },

    updateSelectedList(playlistState, { payload }) {
      playlistState.selectedListId = payload;
    },

    updateIsPlaylistPrivate(playlistState, { payload }) {
      playlistState.isPrivate = payload;
    },

    updateAllowPlaylistAudioRemove(playlistState, { payload }) {
      playlistState.allowPlaylistAudioRemove = payload;
    },
  },
});

export const getPlaylistState = createSelector(
  (state) => state.playlist,
  (playlistState) => playlistState
);

export const {
  updateAllowPlaylistAudioRemove,
  updatePlaylistVisibility,
  updateIsPlaylistPrivate,
  updateSelectedList,
} = playlistSlice.actions;

export default playlistSlice.reducer;
