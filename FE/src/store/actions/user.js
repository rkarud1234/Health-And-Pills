import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "../../api/users";

export const profile = createAsyncThunk(
  "user/profile",
  async (data, thunkAPI) => {
    const result = await getProfile();
    return result.data;
  }
);
