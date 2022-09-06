import GradationButton from "../components/buttons/GradationButton";
import MenuButton from "../components/buttons/MenuButton";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "../components/modals/Modal";
import SocialLoginContent from "../components/modals/contents/SocialLoginContent";
import styled from "styled-components";
import ModalCloseButton from "../components/buttons/ModalCloseButton";

const colorTheme = {
  borderColor: "#39F2AC",
  bgColor: "#39F2AC",
};
const HomeWrapper = styled.div`
  padding: 100px 20px 0px 20px;
`;
const HomeTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserTitleWrapper = styled.div`
  font-size: 30px;
  font-weight: 600;
`;
const UserTitle = styled.div`
  position: relative;
  display: inline-block;
  z-index: 2;
`;

const UserNameLine = styled.div`
  position: absolute;
  height: 10px;
  width: 100%;
  bottom: -4px;
  z-index: -1;
  background-color: ${(props) => props.bgColor};
`;

const UserContent = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 10px 20px 15px;
  border: ${(props) => props.border};
  background-color: transparent;
  border-radius: 10px;
  font-size: 20px;
  margin-top: 20px;
  cursor: pointer;
  & div i {
    margin-right: 10px;
  }
  @media screen and (max-width: 420px) {
    font-size: 14px;
  }
`;
const IconWrapper = styled.div`
  width: 35px;
  text-align: center;
`;

const ChartWapper = styled.div`
  background-color: transparent;
  border: 1px solid ${colorTheme.bgColor};
  height: 40vh;
  border-radius: 5px;
  max-height: 400px;
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InbodyButton = styled.button`
  background-color: ${(props) => props.bgColor};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  border-radius: ${(props) => props.borerRadius};
  color: ${(props) => props.color};
`;

const Landing = () => {
  const [modalState, setModalState] = useState(false);

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };
  return (
    <>
      <Header
        leftNone={false}
        rightChildren={<MenuButton />}
        rightNone={true}
      />
      <div>
        <Modal
          isOpen={modalState}
          modalContent={<SocialLoginContent />}
          closeButton={<ModalCloseButton onClick={closeModal} />}
          close={closeModal}
        />
        랜딩페이지 이미지
        <GradationButton
          text={"간단가입하고 시작하기"}
          width={"50%"}
          fontSize={"18px"}
          padding={"10px 20px 10px 20px"}
          onClick={openModal}
        />
      </div>
    </>
  );
};

const Main = ({ user }) => {
  console.log(user);
  return (
    <HomeWrapper>
      <HomeTitleWrapper>
        <UserTitleWrapper>
          <div style={{ marginBottom: "10px" }}>
            <UserTitle>
              단무지
              <UserNameLine bgColor={colorTheme.bgColor} />
            </UserTitle>
            <span>님</span>
          </div>
          <div>안녕하세요</div>
        </UserTitleWrapper>
        <div>
          <img src={process.env.PUBLIC_URL + "pill.png"} />
        </div>
      </HomeTitleWrapper>
      <div>
        <div>
          <UserContent border={`1px solid ${colorTheme.bgColor}`}>
            <div style={{ display: "flex" }}>
              <IconWrapper>
                <i className="fa-solid fa-cloud-question"></i>
              </IconWrapper>
              당신의 신체 나이가 궁금하다면?
            </div>
            <div>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </UserContent>
          <UserContent border={`1px solid ${colorTheme.bgColor}`}>
            <div style={{ display: "flex" }}>
              <IconWrapper>
                <i className="fa-solid fa-calendar-star"></i>
              </IconWrapper>
              진행중인 이벤트 보러가기
            </div>
            <div>
              <div>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </UserContent>
        </div>
      </div>
      <ChartWapper>
        <InbodyButton
          bgColor={colorTheme.bgColor}
          padding={"20px"}
          width={"240px"}
          fontSize={"18px"}
          borerRadius={"6px"}
          color={"#fff"}
        >
          인바디 정보를 입력해주세요
        </InbodyButton>
      </ChartWapper>
    </HomeWrapper>
  );
};
const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {!user.isLogin ? <Main user={user} /> : <Landing />}
      {!user.isLogin ? <Footer /> : <></>}
    </>
  );
};

export default Home;
