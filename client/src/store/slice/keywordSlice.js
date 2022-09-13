import { createSlice } from "@reduxjs/toolkit";
import socket from "../../socket";

const initialState = {
  preferKeyword: [],
  dispreferKeyword: [],
  productLists: [],
  searchItem: "",
};

export const keywordSlice = createSlice({
  name: "keyword",
  initialState: initialState,
  reducers: {
    logoff: (state) => {
      state = initialState;
    },
    updateLoginStatus: (state, action) => {
      state.isLogin = true;
      state.email = action.payload.email;
      state.authToken = action.payload.auth_token;
    },
    setSearchItem: (state, action) => {
      state.searchItem = action.payload;
      socket.emit("send message", { searchItem: action.payload });
    },
  },
});

export const { logoff, updateLoginStatus, setSearchItem } =
  keywordSlice.actions;
export default keywordSlice.reducer;
