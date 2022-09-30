import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import testSlice from "./testSlice"
import pillSlice from "../actions/pills";
import searchSlice from "../actions/search";
import recommendSlice from "../actions/recommend";


const reducer = combineReducers({
  user: userSlice.reducer,
  sum: testSlice.reducer,
  pill: pillSlice.reducer,
  search: searchSlice.reducer,
  recommend: recommendSlice.reducer
});

export default reducer;
