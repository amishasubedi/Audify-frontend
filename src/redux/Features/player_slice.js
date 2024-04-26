import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  onGoingAudio: null,
  onGoingList: [],
  currentSongIndex: null,
  playing: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    updateOnGoingAudio(playerState, { payload }) {
      playerState.onGoingAudio = payload;
    },

    updateOnGoingList(playerState, { payload }) {
      playerState.onGoingList = payload;
    },

    updateCurrentIndex(playerState, { payload }) {
      playerState.currentSongIndex = payload;
    },

    updatePlayingStatus(playerState, { payload }) {
      playerState.playing = payload;
    },
  },
});

export const getPlayerState = createSelector(
  (state) => state.player,
  (playerState) => playerState
);

export const {
  updateOnGoingAudio,
  updateOnGoingList,
  updateCurrentPosition,
  updateCurrentIndex,
  updatePlayingStatus,
} = playerSlice.actions;

export default playerSlice.reducer;
