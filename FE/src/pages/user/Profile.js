import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Footer from "../../components/layouts/Footer";
import SlidingMenu from "../../components/layouts/SlidingMenu";
import TestFooter from "../../components/layouts/TestFooter";
import UserInfoList from "../../components/user/UserInfoList";
import Inbody from "./Inbody";
import LifeStyle from "./LifeStyle";

const ProfileWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 100vh;
  padding: 0px 0px 20px 0px;
`;

const ProfileTitleWrapper = styled.div`
  padding: 90px 20px 0px 20px;
  & div:first-child {
    font-size: 35px;
    color: white;
    margin-bottom: 10px;
  }
  & div:last-child {
    font-size: 25px;
    margin-left: 3px;
    color: #ffed08;
  }
`;
const ProfileBackGround = styled.div`
  height: 40%;
  background: linear-gradient(to bottom, #537cfe, #6a53fe);
  position: relative;
`;

const LeftTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 10px solid #fff;
  border-top: 5px solid transparent;
  border-left: 20px solid #fff;
  border-right: 20px solid transparent;
  bottom: -1px;
`;

const RightTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 10px solid #fff;
  border-top: 5px solid transparent;
  border-left: 20px solid transparent;
  border-right: 20px solid #fff;
  bottom: -1px;
  right: 0;
`;
const ProfileList = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  justify-content: space-around;
  padding: 8px 0px 4px 0px;
  box-shadow: 0px 5px 10px 2px rgb(0 0 0 / 10%);
  margin-top: 30px;
`;
const ProfileListItem = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  background-color: transparent;
  font-weight: 600;
  width: 85px;
  cursor: pointer;
  & img {
    margin-bottom: 10px;
  }
  @media screen and (max-width: 280px) {
    & img {
      width: 30px;
    }
    width: 70px;
    font-size: 10px;
  }
`;

const ProfileEditButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 10px 20px 30px;
  border: ${(props) => props.border};
  background-color: ${(props) => props.bgColor};
  font-size: 20px;
  margin-top: 20px;
  box-shadow: 0px 5px 10px 2px rgb(0 0 0 / 10%);
  cursor: pointer;
  & div i {
    margin-right: 10px;
  }
  @media screen and (max-width: 280px) {
    font-size: 12px;
    padding: 20px 8px 20px 20px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  padding: 0px 20px;
  top: -60px;
  position: relative;
  padding: 0px 20px;
`;

const LogOutBtnWrapper = styled(ProfileEditButton)`
  justify-content: center;
  background-color: #fff;
  padding: 18px 10px 18px 10px;
  & button {
    width: 100%;
    height: 100%;
    background-color: transparent;
    font-size: 18px;
    color: #ee5c5c;
  }
  @media screen and (max-width: 280px) {
    & button {
      font-size: 12px;
    }
  }
`;

const listItem = [
  {
    title: "나의 영양제",
    img: "/profile/pill.png",
    type: "pill",
    slidingMenuTitle: "내 영양제 정보",
  },
  {
    title: "나의 운동",
    img: "/profile/dumbell.png",
    type: "health",
    slidingMenuTitle: "내 운동 정보",
  },
  {
    title: "북마크",
    img: "/profile/mark.png",
    type: "mark",
    slidingMenuTitle: "북마크",
  },
];

const editList = [
  {
    title: "라이프 스타일 수정",
    type: "lifeStyle",
    slidingMenuTitle: "내 라이프 스타일",
  },
  {
    title: "인바디 정보 수정",
    type: "inBody",
    slidingMenuTitle: "내 인바디 정보",
  },
];
const TestProfile = () => {
  const [slidingMenuState, setSlidingMenuState] = useState({
    type: "",
    active: false,
    title: "",
  });

  const [userInfoState, setUserInfoState] = useState({
    pill: [
      { id: 1, img: "", title: "비타민C", rating: 4.5 },
      { id: 2, img: "", title: "비타민D", rating: 4.2 },
      { id: 3, img: "", title: "포도당", rating: 4.4 },
      { id: 4, img: "", title: "숭구리당당", rating: 4.8 },
      { id: 5, img: "", title: "집가고싶당", rating: 5 },
      { id: 6, img: "", title: "허당", rating: 4.8 },
      { id: 7, img: "", title: "위풍당당", rating: 4.8 },
      { id: 8, img: "", title: "올리고당", rating: 4.8 },
    ],
    health: [
      { id: 1, title: "벤치프레스" },
      { id: 2, title: "푸쉬업" },
      { id: 3, title: "사이드 레그 레이즈" },
      { id: 4, title: "숨쉬기 운동" },
    ],
    mark: [],
  });
  const onHandleSlidingMenu = (type, slidingMenuTitle) => {
    setSlidingMenuState({
      type,
      active: true,
      title: slidingMenuTitle,
    });
  };

  const closeSlidingMenu = () => {
    setSlidingMenuState({
      type: "",
      active: false,
      title: "",
    });
  };

  const onHandleDeleteUserInfo = (type, id) => {
    const newUserInfoList = userInfoState[type].filter(
      (item) => item.id !== id
    );
    setUserInfoState({ ...userInfoState, [type]: newUserInfoList });
  };

  const onHandleLogOut = () => {
    console.log("logOut");
  };

  const renderContent = (type) => {
    if (type === "lifeStyle") {
      return <LifeStyle />;
    } else if (type === "inBody") {
      return <Inbody />;
    }
    return (
      <UserInfoList
        infoList={userInfoState[slidingMenuState.type]}
        deleteUserInfo={onHandleDeleteUserInfo}
        type={slidingMenuState.type}
      />
    );
  };
  return (
    <>
      <ProfileWrapper>
        <ProfileBackGround>
          <ProfileTitleWrapper>
            <div>
              단무지님<p>안녕하세요</p>
            </div>
            <div>5세, 남성</div>
          </ProfileTitleWrapper>
          <LeftTriangle />
          <RightTriangle />
        </ProfileBackGround>
        <ContentWrapper>
          <ProfileList>
            {listItem.map((item, idx) => (
              <ProfileListItem
                key={idx}
                onClick={() =>
                  onHandleSlidingMenu(item.type, item.slidingMenuTitle)
                }
              >
                <img src={process.env.PUBLIC_URL + item.img} width={"40px"} />
                {item.title}
              </ProfileListItem>
            ))}
          </ProfileList>
          <div>
            {editList.map((item, idx) => (
              <ProfileEditButton
                key={idx}
                border={"none"}
                bgColor={"#fff"}
                onClick={() =>
                  onHandleSlidingMenu(item.type, item.slidingMenuTitle)
                }
              >
                <div style={{ display: "flex" }}>{item.title}</div>
                <div>
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </ProfileEditButton>
            ))}
          </div>
          <LogOutBtnWrapper as="div">
            <button onClick={onHandleLogOut}>로그아웃</button>
          </LogOutBtnWrapper>
        </ContentWrapper>
        <SlidingMenu
          {...slidingMenuState}
          close={closeSlidingMenu}
          slidingMenuTitle={slidingMenuState.title}
          contents={renderContent(slidingMenuState.type)}
        />
      </ProfileWrapper>
      <Footer />
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <TestFooter />
      </div> */}
    </>
  );
};

export default React.memo(TestProfile);
