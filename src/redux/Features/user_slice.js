import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loggedIn: false,
  busy: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const { actions } = userSlice;
export default userSlice.reducer;
