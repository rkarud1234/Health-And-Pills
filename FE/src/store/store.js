import { configureStore } from "@reduxjs/toolkit";
import { profileMiddleware } from "./profileMiddleware";
import reducer from "./reducers";
import { sessionStorageMiddleware } from "./sessionStorageMiddleware";
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sessionStorageMiddleware, profileMiddleware),
  devTools: true,
});

export default store;
