import { createSlice } from "@reduxjs/toolkit";
import socket from "../../socket";

const initialState = {
  preferKeywords: [],
  dispreferKeywords: [],
  productLists: [],
  searchItem: "",
};

export const keywordSlice = createSlice({
  name: "keyword",
  initialState: initialState,
  reducers: {
    setSearchItem: (state, action) => {
      state.searchItem = action.payload;
      socket.emit("send message", { searchItem: action.payload });
    },
    setKeywords: (state, action) => {
      state[action.payload.type] = action.payload.keywords;
    },
    setProductList: (state, action) => {
      state.productLists = action.payload;
    },
  },
});

export const {
  logoff,
  updateLoginStatus,
  setSearchItem,
  setKeywords,
  setProductList,
} = keywordSlice.actions;
export default keywordSlice.reducer;
