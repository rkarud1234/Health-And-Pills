import { profile } from "./actions/user";
import { logIn } from "./reducers/userSlice";

export const profileMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case profile.pending.type:
      store.dispatch(logIn());
    default:
      break;
  }
  return next(action);
};
