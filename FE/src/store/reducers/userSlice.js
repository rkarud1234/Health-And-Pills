import { createSlice } from "@reduxjs/toolkit";
import { profile } from "../actions/user";

const initialState = {
  isLogin: false,
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: () => initialState,
    logIn: () => {
      return {
        ...initialState,
        isLogin: true,
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(profile.pending, (state, action) => {})
      .addCase(profile.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(profile.rejected, (state, action) => {}),
});

export default userSlice;
export const { logOut, logIn } = userSlice.actions;
