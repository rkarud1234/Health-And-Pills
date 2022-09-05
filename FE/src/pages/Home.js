import GradationButton from "../components/buttons/GradationButton";
import MenuButton from "../components/buttons/MenuButton";
import PillCard from "../components/cards/PillCard";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "../components/modals/Modal";
import SocialLoginContent from "../components/modals/contents/SocialLoginContent";
import styled from "styled-components";

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

const UserContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 10px 20px 15px;
  border: 1px solid #5367fa;
  border-radius: 10px;
  background-color: #5367fa;
  color: white;
  font-size: 20px;
  margin-top: 20px;
  & div i {
    margin-right: 10px;
  }
`;
const Landing = () => {
  const [modalState, setModalState] = useState(false);

  const openModal = () => {
    setModalState(true);
  };
  return (
    <>
      <Header
        leftNone={false}
        rightChildren={<MenuButton />}
        rightNone={true}
      />
      <div>
        <Modal isOpen={modalState} modalContent={<SocialLoginContent />} />
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
              <UserNameLine bgColor={"#5367FA"} />
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
          <UserContent>
            <div>
              <i className="fa-solid fa-cloud-question"></i>당신의 신체 나이가
              궁금하다면?
            </div>
            <div>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </UserContent>
          <UserContent>
            <div>
              <i className="fa-solid fa-calendar-star"></i>진행중인 이벤트
              보러가기
            </div>
            <div>
              <div>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </UserContent>
        </div>
      </div>
      <div>메인</div>
    </HomeWrapper>
  );
};
const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {!user.isLogin ? <Main user={user} /> : <Landing />}
      {!user.isLogin ? <Footer /> : <></>}
      <PillCard />
    </>
  );
};

export default Home;
