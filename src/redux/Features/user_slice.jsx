import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loggedIn: false,
  busy: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // reducers - login, signup, ...
  },
});

// export const {} = userSlice.actions - all api implemented are actions
export default userSlice.reducer;
