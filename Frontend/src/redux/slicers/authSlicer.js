import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  isLogged: false,
  accessToken: null,
  refreshToken: null,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.userInfo = payload;
    },

    handleAuthenticate: (state, { payload }) => {
      state.userInfo = payload.user;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.isLogged = true;
    },

    signOut: () => {
      return initialState;
    },
  },
});

export const userData = (state) => state.auth.userInfo;

export const { setUserData, handleAuthenticate, signOut } = auth.actions;

export default auth.reducer;
