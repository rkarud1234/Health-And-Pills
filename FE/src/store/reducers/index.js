import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import testSlice from "./testSlice"

const reducer = combineReducers({
  user: userSlice.reducer,
  sum: testSlice.reducer,
});

export default reducer;
