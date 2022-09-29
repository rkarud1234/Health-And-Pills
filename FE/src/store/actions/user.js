import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProfile,
  updateUserExercise,
  updateUserinbody,
} from "../../api/users";

export const profile = createAsyncThunk(
  "user/profile",
  async (data, thunkAPI) => {
    const result = await getProfile();
    return result.data;
  }
);

export const editLifestyle = createAsyncThunk(
  "user/edit/lifestyle",
  async (data, thunkAPI) => {
    await updateUserExercise(data);
  }
);

export const editInbody = createAsyncThunk(
  "user/edit/inbody",
  async (data, thunkAPI) => {
    await updateUserinbody(data);
  }
);
