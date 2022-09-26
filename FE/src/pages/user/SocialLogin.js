import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { profile } from "../../store/actions/user";

const SocialLogin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const accessToken = searchParams.get("accesstoken");
  const refreshToken = searchParams.get("refreshtoken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  sessionStorage.setItem("ACCESS_TOKEN", accessToken);
  sessionStorage.setItem("REFRESH_TOKEN", refreshToken);
  const { isLogin, data, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(profile());
    if (isLogin && data === "") {
      navigate("/require");
    }
    if (isLogin && data !== "" && data !== null) {
      navigate("/");
    }
  }, [isLogin, data, loading]);
  return <></>;
};

export default SocialLogin;