import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  onGoingAudio: null,
  onGoingList: [],
  currentSongIndex: null,
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
} = playerSlice.actions;

export default playerSlice.reducer;
