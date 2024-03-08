import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

const initialState = {
  onGoingAudio: null,
  onGoingList: [],
  playbackRate: 1,
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

    updatePlaybackRate(playerState, { payload }) {
      playerState.playbackRate = payload;
    },
  },
});

export const getPlayerState = createSelector(
  (state) => state.player,
  (playerState) => playerState
);

export const { updateOnGoingAudio, updateOnGoingList, updatePlaybackRate } =
  playerSlice.actions;

export default playerSlice.reducer;
