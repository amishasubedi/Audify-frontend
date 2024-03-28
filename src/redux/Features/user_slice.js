import { createSelector, createSlice } from "@reduxjs/toolkit";

const UserProfile = {
  id: Int16Array,
  name: String,
  email: String,
  avatar: String,
  followers: Number,
  followings: Number,
};

const initialState = {
  profile: UserProfile | null,
  loggedIn: false,
  busy: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateProfile(authState, { payload }) {
      authState.profile = payload;
    },
    updateLoggedInState(authState, { payload }) {
      authState.loggedIn = payload;
    },
  },
});

export const getAuthState = (state) => state.auth;

export const { updateLoggedInState, updateProfile } = userSlice.actions;
export default userSlice.reducer;
