import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../components/layouts/Loading";
import { profile } from "../store/actions/user";

const loadCheck = () => {
  return sessionStorage.getItem("ACCESS_TOKEN") !== null ? true : false;
};
const PrivateRoute = ({ component: Component }) => {
  const authenticated = useSelector((state) => state.user.isLogin);
  console.log(authenticated);
  const data = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loadCheck) {
      dispatch(profile());
    }
  }, []);

  if (loadCheck()) {
    if (data === "") {
      return <Navigate to="/require" />;
    }
    if (data !== "" && data !== null) {
      return Component;
    }

    return <Loading />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
