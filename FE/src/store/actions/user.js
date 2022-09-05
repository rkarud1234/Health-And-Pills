import { createAsyncThunk } from "@reduxjs/toolkit";

const logIn = createAsyncThunk("user/logIn", async (data, thunkAPI) => {});
const getProfile = createAsyncThunk(
  "user/getProfile",
  async (data, thunkAPI) => {
    const result = await getProfile();
    return result;
  }
);
export { logIn, getProfile };
