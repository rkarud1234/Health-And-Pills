import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { profile } from "../store/actions/user";

const loadCheck = () => {
  return sessionStorage.getItem("ACCESS_TOKEN") !== null ? true : false;
};
const PrivateRoute = ({ component: Component }) => {
  // const authenticated = useSelector((props) => props.user.isLogin);
  const authenticated = loadCheck();
  if (authenticated) {
    const data = useSelector((state) => state.user.data);
    if (data !== "") {
      return Component;
    }
  }
  return authenticated ? Component : <Navigate to="/" />;
};

export default PrivateRoute;
