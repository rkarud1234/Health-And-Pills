import { login, logOut } from "./reducers/userSlice";

export const sessionStorageMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    // case login.fulfilled.type:
    // window.sessionStorage.setItem("jwt", action.payload.token);
    //   agent.setToken(action.payload.token);
    // break;
    case logOut.type:
      window.localStorage.removeItem("jwt");
      break;
    default:
      break;
  }

  return next(action);
};
