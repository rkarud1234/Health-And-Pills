import React, { useCallback, useEffect, useRef } from "react";
import { client } from "../../api";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../components/layouts/Footer";
import Loading from "../../components/layouts/Loading";
import SlidingMenu from "../../components/layouts/SlidingMenu";
import UserExercise from "../../components/user/profile/UserExercise";
import UserLike from "../../components/user/profile/UserLike";
import UserPill from "../../components/user/profile/UserPill";
import { profile } from "../../store/actions/user";
import { logOut } from "../../store/reducers/userSlice";
import Bookmark from "./Bookmark";
import Inbody from "./Inbody";
import LifeStyle from "./LifeStyle";
import Like from "./Like";
import Review from "./Review/Review";

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
  @media screen and (max-width: 500px) {
    padding: 60px 20px 0px 20px;
  }

  @media screen and (max-width: 395px) {
    padding: 80px 20px 0px 20px;
    & p {
      font-size: 30px;
    }
  }
  @media screen and (max-width: 377px) {
    padding: 50px 20px 0px 20px;
    & p {
      font-size: 28px;
    }
  }

  @media screen and (max-width: 280px) {
    padding: 50px 20px 0px 20px;
    & p {
      font-size: 24px;
    }
    & div:last-child {
      font-size: 20px;
    }
  }
`;
const ProfileBackGround = styled.div`
  height: 40%;
  background: linear-gradient(to bottom, #537cfe, #6a53fe);
  position: relative;
`;

const ReviewLikeWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-around;
  & button {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 35%;
    color: #fff;
    text-align: center;
    font-size: 20px;
    height: 60px;
    border-radius: 6px;
    cursor: pointer;
    background-color: #aba9ff57;
    position: relative;
    @media screen and (min-width: 375px) {
      font-size: 18px;
      height: 50px;
    }
    @media screen and (max-width: 280px) {
      font-size: 15px;
      height: 45px;
    }
    & span {
      position: relative;
      margin-top: 4px;
      font-size: 12px;
    }
  }
  & button:first-child span {
    left: -1px;
  }
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
  @media screen and (max-width: 377px) {
    height: 65px;
  }
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
  @media screen and (max-width: 377px) {
    & img {
      width: 30px;
      margin-bottom: 8px;
    }
    width: 70px;
    font-size: 10px;
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
  font-size: 18px;
  margin-top: 20px;
  box-shadow: 0px 5px 10px 2px rgb(0 0 0 / 10%);
  cursor: pointer;
  & div i {
    margin-right: 10px;
  }
  @media screen and (max-width: 377px) {
    font-size: 14px;
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
    img: "/profileImages/pill.png",
    infoType: "pill",
    slidingMenuTitle: "내 영양제 정보",
  },
  {
    title: "나의 운동",
    img: "/profileImages/dumbell.png",
    infoType: "exercise",
    slidingMenuTitle: "내 운동 정보",
  },
  {
    title: "북마크",
    img: "/profileImages/mark.png",
    infoType: "bookmark",
    slidingMenuTitle: "북마크",
  },
];

const editList = [
  {
    title: "라이프 스타일 수정",
    infoType: "lifeStyle",
    slidingMenuTitle: "내 라이프 스타일",
  },
  {
    title: "인바디 정보 수정",
    infoType: "inBody",
    slidingMenuTitle: "내 인바디 정보",
  },
];

const getUserAge = (birth) => {
  const birthYear = birth.slice(0, 4);
  const today = new Date();
  let age = today.getFullYear() - birthYear;
  const month = today.getMonth() - birth.slice(4, 6);
  const day = birth.slice(6, 8);
  if (month < 0 || (month === 0 && today.getDate() < day)) {
    age--;
  }

  return age;
};
const Profile = () => {
  const { state } = useLocation();

  const [slidingMenuState, setSlidingMenuState] = useState({
    infoType: "",
    active: false,
    title: "",
  });
  useEffect(() => {
    dispatch(profile());
  }, []);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onHandleSlidingMenu = useCallback(
    (infoType, slidingMenuTitle) => {
      setSlidingMenuState({
        infoType: infoType,
        active: true,
        title: slidingMenuTitle,
      });
    },
    [slidingMenuState.infoType]
  );

  const closeSlidingMenu = useCallback(() => {
    setSlidingMenuState((prevState) => {
      return {
        ...prevState,
        active: false,
      };
    });
  }, []);
  const onHandleLogOut = useCallback(() => {
    dispatch(logOut());
    navigate("/");
  }, []);

  const onHandleUserQuit = (async () => {
    if (window.confirm('정말 탈퇴 하시겠습니까?')) {
      await client.delete('/users')
      dispatch(logOut());
      navigate("/");
    }
  })

  const renderContent = useCallback(() => {
    if (slidingMenuState.active) {
      if (slidingMenuState.infoType === "lifeStyle") {
        return <LifeStyle />;
      } else if (slidingMenuState.infoType === "inBody") {
        return <Inbody />;
      } else if (slidingMenuState.infoType === "review") {
        return <Review />;
      } else if (slidingMenuState.infoType === "like") {
        return <UserLike />;
      } else if (slidingMenuState.infoType === "bookmark") {
        return <Bookmark bookmarkType={state !== null ? state.type : null} />;
      } else if (slidingMenuState.infoType === "pill") {
        return <UserPill />;
      } else return <UserExercise />;
    } else {
      return <></>;
    }
  }, [slidingMenuState.infoType, slidingMenuState.active]);
  return (
    <>
      {user.data !== null ? (
        <>
          <ProfileWrapper>
            <ProfileBackGround>
              <ProfileTitleWrapper>
                <div>
                  <p>{user.data.userProfileNickname}님</p>
                  <p>안녕하세요</p>
                </div>
                <div>
                  {getUserAge(user.data.userProfileBirthday)}세,{" "}
                  {user.data.userProfileGender === "male" ? "남성" : "여성"}
                </div>
              </ProfileTitleWrapper>
              <ReviewLikeWrapper>
                <button
                  onClick={() => onHandleSlidingMenu("review", "내 리뷰")}
                >
                  <i className="fa-regular fa-pen"></i>
                  <span>리뷰</span>
                </button>
                <button onClick={() => onHandleSlidingMenu("like", "좋아요")}>
                  <i className="fa-sharp fa-solid fa-circle-heart"></i>
                  <span>좋아요</span>
                </button>
              </ReviewLikeWrapper>
              <LeftTriangle />
              <RightTriangle />
            </ProfileBackGround>
            <ContentWrapper>
              <ProfileList>
                {listItem.map((item, idx) => (
                  <ProfileListItem
                    key={idx}
                    onClick={() =>
                      onHandleSlidingMenu(item.infoType, item.slidingMenuTitle)
                    }
                  >
                    <img
                      src={process.env.PUBLIC_URL + item.img}
                      width={40}
                      height={40}
                    />
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
                      onHandleSlidingMenu(item.infoType, item.slidingMenuTitle)
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
              <LogOutBtnWrapper as="div">
                <button onClick={onHandleUserQuit}>회원탈퇴</button>
              </LogOutBtnWrapper>
            </ContentWrapper>
            <SlidingMenu
              {...slidingMenuState}
              close={closeSlidingMenu}
              slidingMenuTitle={slidingMenuState.title}
              contents={renderContent(slidingMenuState.infoType)}
            />
          </ProfileWrapper>
          <Footer />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default React.memo(Profile);
