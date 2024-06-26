import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "error",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    updateAlert(alertState, { payload }) {
      alertState.message = payload.message;
      alertState.type = payload.type;
    },
    clearAlert(alertState) {
      alertState.message = "";
      alertState.type = "error";
    },
  },
});

export const getAlertState = createSelector(
  (state) => state.alert,
  (alertState) => alertState
);

export const { updateAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
