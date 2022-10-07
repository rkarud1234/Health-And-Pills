import { createSlice } from "@reduxjs/toolkit";
import { profile } from "../actions/user";

const initialState = {
  isLogin: false,
  data: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: () => initialState,
    logIn: (state) => {
      return {
        ...state,
        isLogin: true,
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(profile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = false;
      }),
});

export default userSlice;
export const { logOut, logIn } = userSlice.actions;
