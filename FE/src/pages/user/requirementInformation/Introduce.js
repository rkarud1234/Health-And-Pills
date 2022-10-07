import styled from "styled-components";
import GradationButton from "../../../components/buttons/GradationButton";

const IntroWrapper = styled.div`
  height: 60vh;
  margin-top: 110px;
  position: relative;
  animation: fadeIn 1s ease-in-out;
  @keyframes fadeIn {
    from {
      top: 100px;
      opacity: 0;
    }
    to {
      top: 0px;
      opacity: 1;
    }
  }
`;

const IntroImageWrapper = styled.div`
  display: flex;
  margin-bottom: 40px;

  justify-content: center;
  & img {
    width: 200px;
  }
`;
const IntroMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px auto 30px auto;
  width: 70%;
  position: relative;

  & div:first-child {
    margin-bottom: 10px;
  }
  & div {
    font-family: "NanumSquareRound";
    font-size: 20px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 60px;
  text-align: center;
`;
const Introduce = ({ changeType }) => {
  return (
    <IntroWrapper>
      <IntroMessageWrapper>
        <div>원활한 서비스 이용을 위해</div>
        <div>필수정보를 입력해주세요!</div>
      </IntroMessageWrapper>
      <IntroImageWrapper>
        <img src={process.env.PUBLIC_URL + "/profileImages/require.png"} />
      </IntroImageWrapper>

      <ButtonWrapper>
        <GradationButton
          type="button"
          width={"100px"}
          padding={"10px 20px"}
          fontSize={"16px"}
          onClick={() => changeType("first")}
          text={"확인"}
          fontFamily={"NanumSquareRound"}
        />
      </ButtonWrapper>
    </IntroWrapper>
  );
};

export default Introduce;
