import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const login = createAsyncThunk(
//   "auth/login",
//   async (userData: { email: string; password: string }, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "https://jh-blog-api.yoonleeverse.com/user/login",
//         userData,
//         {
//           withCredentials: true,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       const errorWrap = error as AxiosError;
//       return thunkAPI.rejectWithValue(errorWrap.response?.status);
//     }
//   }
// );

// export const getRefreshToken = createAsyncThunk(
//   "auth/refresh",
//   async (refresh_token: string, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "https://jh-blog-api.yoonleeverse.com/user/refresh",
//         { refresh_token }
//       );
//       if (!response.data.refresh_token) {
//         setCookie("refreshToken", "", 0);
//         thunkAPI.dispatch(logoff());
//         return { isSuccess: true };
//       } else {
//         setCookie("refreshToken", response.data.refresh_token, 7);
//         thunkAPI.dispatch(
//           updateLoginStatus({
//             email: response.data.email,
//             auth_token: response.data.auth_token,
//           })
//         );
//         return { isSuccess: true };
//       }
//     } catch (error) {
//       const errorWrap = error as AxiosError;
//       return thunkAPI.rejectWithValue(errorWrap.response?.status);
//     }
//   }
// );isLogin: false, userData: {}, likeKwd: [], hateKwd: [], productlists: []

const initialState = {
  preferKeyword: [],
  dispreferKeyword: [],
  productLists: [],
};

export const keywordSlice = createSlice({
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

export const { logoff, updateLoginStatus } = keywordSlice.actions;
export default keywordSlice.reducer;
