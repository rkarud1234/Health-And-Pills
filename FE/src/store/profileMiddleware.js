import { editInbody, editLifestyle, profile } from "./actions/user";
import { logIn } from "./reducers/userSlice";

export const profileMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case profile.pending.type:
      const user = store.getState().user;
      if (!user.isLogin) {
        store.dispatch(logIn());
      }
      break;

    case editLifestyle.fulfilled.type:
    case editInbody.fulfilled.type:
      store.dispatch(profile());
      break;
    default:
      break;
  }
  return next(action);
};
