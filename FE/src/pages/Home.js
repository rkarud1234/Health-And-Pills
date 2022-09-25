import GradationButton from "../components/buttons/GradationButton";
import MenuButton from "../components/buttons/MenuButton";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "../components/modals/Modal";
import SocialLoginContent from "../components/modals/contents/SocialLoginContent";
import styled from "styled-components";
import ModalCloseButton from "../components/buttons/ModalCloseButton";
import { useNavigate } from 'react-router-dom';
import { profile } from "../store/actions/user";

const colorTheme = {
  borderColor: "#537CFE",
  bgColor: "#537CFE",
  bgColorFrom: "#537CFE",
  bgColorTo: "#6A53FE",
};
const HomeWrapper = styled.div`
  padding: 80px 20px 0px 20px;
  @media screen and (max-width: 280px) {
    padding: 50px 20px 0px 20px;
  }
`;
const HomeTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserTitleWrapper = styled.div`
  font-size: 30px;
  font-weight: 600;
  position: relative;
  opacity: 0;
  animation: fadeIn 1s linear;
  animation-delay: 0.1s;
  animation-fill-mode: forwards;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media screen and (max-width: 280px) {
    font-size: 20px;
  }
`;
const UserTitle = styled.div`
  position: relative;
  display: inline-block;
  z-index: 2;
`;

const UserNameLine = styled.div`
  position: absolute;
  height: 8px;
  bottom: -4px;
  /* width: 100%; */
  z-index: -1;
  background-color: ${(props) => props.bgColor};
  animation: lineDraw 0.1s linear;
  animation-delay: 1.5s;
  animation-fill-mode: forwards;
  @keyframes lineDraw {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

const UserContent = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 10px 20px 15px;
  border: ${(props) => props.border};
  color: ${(props) => props.color};
  background: linear-gradient(
    to bottom,
    ${colorTheme.bgColorFrom},
    ${colorTheme.bgColorTo}
  );
  border-radius: 10px;
  font-size: 20px;
  margin-top: 20px;
  cursor: pointer;
  & div i {
    margin-right: 10px;
  }
  @media screen and (max-width: 420px) {
    font-size: 16px;
  }
  @media screen and (max-width: 280px) {
    font-size: 10px;
  }
`;
const IconWrapper = styled.div`
  width: 35px;
  text-align: center;
  display: flex;
  align-items: center;
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
  background: linear-gradient(
    to bottom,
    ${colorTheme.bgColorFrom},
    ${colorTheme.bgColorTo}
  );
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  border-radius: ${(props) => props.borerRadius};
  color: ${(props) => props.color};
  @media screen and (max-width: 280px) {
    font-size: 10px;
    width: 80%;
  }
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
      <div style={{ height: "100vh", position: "relative" }}>
        <Modal
          isOpen={modalState}
          modalContent={<SocialLoginContent />}
          closeButton={<ModalCloseButton onClick={closeModal} />}
          close={closeModal}
        />
        랜딩페이지 이미지
        <GradationButton
          text={"간단가입하고 시작하기"}
          width={"70%"}
          fontSize={"18px"}
          padding={"10px 20px 10px 20px"}
          onClick={openModal}
          // style={{
          //   position: "absolute",
          //   bottom: "70px",
          //   left: "50%",
          //   transform: "translate(-50%, -50%)",
          // }}
        />
      </div>
    </>
  );
};

const Main = ({ user }) => {

  const navigate = useNavigate()
  console.log(user);

  return (
    <HomeWrapper>
      <HomeTitleWrapper style={{ position: "relative" }}>
        <UserTitleWrapper>
          <div style={{ marginBottom: "10px" }}>
            <UserTitle>
              {user.userProfileNickname}
              <UserNameLine bgColor={colorTheme.bgColor} />
            </UserTitle>
            <span>님</span>
          </div>
          <div>안녕하세요</div>
        </UserTitleWrapper>
        <div>
          {/* <HeartBeat /> */}
          <img src={process.env.PUBLIC_URL + "pill.png"} />
        </div>
      </HomeTitleWrapper>
      <div>
        <div>
          <UserContent
            border={"none"}
            color={"#fff"}
            bgColor={colorTheme.bgColor}
            onClick={() => { navigate('/form') }}
          >
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
          <UserContent
            border={"none"}
            color={"#fff"}
            bgColor={colorTheme.bgColor}
          >
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
          padding={"20px"}
          width={"280px"}
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

const loadCheck = () => {
  return sessionStorage.getItem("ACCESS_TOKEN") !== null ? true : false;
};

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const mainLoader = loadCheck();
  useEffect(() => {
    if (mainLoader) {
      dispatch(profile());
    }
  }, []);
  console.log(user);
  if (mainLoader) {
    return (
      <>
        {user.isLogin && user.data !== null && user.data !== "" ? (
          <Main user={user.data} />
        ) : (
          <>Loading...</>
        )}
        {user.isLogin && user.data !== null ? <Footer /> : <></>}
      </>
    );
  } else {
    return <Landing />;
  }
};

export default Home;
