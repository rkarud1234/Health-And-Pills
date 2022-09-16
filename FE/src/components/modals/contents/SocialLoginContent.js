import styled from "styled-components";

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
  return (
    <StyeldSocialLoginContent>
      <div>LOGO</div>
      <SocialLinkWrapper>
        <a href="http://localhost:8080/oauth2/authorization/kakao">
          <img
            src={
              process.env.PUBLIC_URL + "social/kakao_login_medium_narrow.png"
            }
          />
        </a>
        <GoogleLink href="http://localhost:8080/oauth2/authorization/google">
          <img src={process.env.PUBLIC_URL + "social/google_icon.png"} />
          <GoogleText>구글 로그인</GoogleText>
        </GoogleLink>
      </SocialLinkWrapper>
    </StyeldSocialLoginContent>
  );
};

export default SocialLoginContent;
