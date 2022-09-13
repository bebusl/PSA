import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isLogin: false,
  userData: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logoff: (state) => {
      state = initialState;
    },
    updateLoginStatus: (state, action) => {
      console.log(action);
      state.isLogin = true;
      state.email = action.payload.email;
      state.authToken = action.payload.auth_token;
    },
  },
});

export const { logoff, updateLoginStatus } = authSlice.actions;
export default authSlice.reducer;
