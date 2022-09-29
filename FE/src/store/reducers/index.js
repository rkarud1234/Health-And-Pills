import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import testSlice from "./testSlice"
import pillSlice from "../actions/pill";
import searchSlice from "../actions/search";

const reducer = combineReducers({
  user: userSlice.reducer,
  sum: testSlice.reducer,
  pill: pillSlice.reducer,
  search: searchSlice.reducer
});

export default reducer;
