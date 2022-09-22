import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { profile } from "../../../store/actions/user";

const StyeldSocialLoginContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

const GoogleLink = styled.a`
  text-align: center;
  display: flex;
  align-items: center;
  border: 1px solid #e1d9d9;
  border-radius: 6px;
  padding: 8px;
  margin-top: 10px;
  & img {
    height: 25px;
  }
  & span {
    width: 74%;
  }
`;
const GoogleText = styled.span``;
const SocialLoginContent = () => {
  // 임시 코드
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onHandleTempLogin = () => {
    navigate("/social/redirect");
  };
  return (
    <StyeldSocialLoginContent>
      <div>LOGO</div>
      <SocialLinkWrapper>
        <a href="https://j7b203.p.ssafy.io/oauth2/authorization/kakao">
          <img
            src={
              process.env.PUBLIC_URL + "social/kakao_login_medium_narrow.png"
            }
          />
        </a>
        <GoogleLink href="https://j7b203.p.ssafy.io/oauth2/authorization/google">
          <img src={process.env.PUBLIC_URL + "social/google_icon.png"} />
          <GoogleText>구글 로그인</GoogleText>
        </GoogleLink>
      </SocialLinkWrapper>
    </StyeldSocialLoginContent>
  );
};

export default SocialLoginContent;
