import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import testSlice from "./testSlice"
import pillSlice from "../actions/pill";

const reducer = combineReducers({
  user: userSlice.reducer,
  sum: testSlice.reducer,
  pill: pillSlice.reducer,
});

export default reducer;
