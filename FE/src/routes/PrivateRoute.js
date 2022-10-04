import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { loginAlert } from "../utils/sweetAlert";

function PrivateRoute({ component: Component }) {
  const authenticated = useSelector((props) => props.user.isLogin);
  return authenticated ? Component : <Navigate to="/" />;
}

export default PrivateRoute;
