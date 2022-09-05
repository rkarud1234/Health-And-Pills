import { login, logout } from "./reducers/userSlice";

const sessionStorageMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case login.fulfilled.type:
      window.sessionStorage.setItem("jwt", action.payload.token);
      //   agent.setToken(action.payload.token);
      break;

    case logout.type:
      window.localStorage.removeItem("jwt");
      //   agent.setToken(undefined);
      break;
    default:
      break;
  }

  return next(action);
};

export { sessionStorageMiddleware };
