import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { profile } from "../store/actions/user";

const PrivateRoute = ({ component: Component }) => {
  const authenticated = useSelector((props) => props.user.isLogin);
  return authenticated ? Component : <Navigate to="/" />;
};

export default PrivateRoute;
