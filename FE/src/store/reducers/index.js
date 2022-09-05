import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const reducer = combineReducers({
  user: userSlice.reducer,
});

export default reducer;
