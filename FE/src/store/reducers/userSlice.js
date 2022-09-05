import { createSlice } from "@reduxjs/toolkit";
import { logIn, getProfile } from "../actions/user";

const initialState = {
  isLogin: false,
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  // 동기적 action
  // 내부적 action
  reducers: {
    logOut(state, action) {
      state.data = null;
    },
  },
  // 비동기적 action
  // 외부적 action
  extraReducers: (builder) =>
    builder
      .addCase(logIn.pending, (state, action) => {})
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLogin = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(getProfile.pending, (state, action) => {})
      .addCase(getProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {}),
});

export default userSlice;
