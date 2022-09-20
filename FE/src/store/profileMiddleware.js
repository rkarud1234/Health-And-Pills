import { profile } from "./actions/user";
import { logIn } from "./reducers/userSlice";

export const profileMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case logIn.type:
      store.dispatch(profile());
      break;
    default:
      break;
  }

  return next(action);
};
