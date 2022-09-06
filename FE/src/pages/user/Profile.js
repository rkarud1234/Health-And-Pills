import styled from "styled-components";
import Footer from "../../components/layouts/Footer";

const ProfileWrapper = styled.div`
  padding: 100px 20px 0px 20px;
`;
const ProfileList = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  justify-content: space-around;
  padding: 8px 0px 4px 0px;
  box-shadow: 0px 5px 10px 2px rgb(0 0 0 / 10%);
`;
const ProfileListItem = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  background-color: transparent;
  font-weight: 600;
  cursor: pointer;
  & img {
    margin-bottom: 10px;
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
`;

const listItem = [
  { title: "나의 영양제", img: "/profile/pill.png" },
  { title: "나의 운동", img: "/profile/dumbell.png" },
  { title: "북마크", img: "/profile/mark.png" },
];

const editList = [
  { title: "라이프 스타일 수정" },
  { title: "인바디 정보 수정" },
];
const Profile = () => {
  return (
    <>
      <ProfileWrapper>
        <div>
          <div>
            <div>단무지</div>
            <div>5세, 고양이</div>
          </div>
          <div>
            <div>인바디 : 스코티쉬폴드</div>
            <div>라이프스타일 : 냥생</div>
          </div>
        </div>
        <ProfileList>
          {listItem.map((item) => (
            <ProfileListItem>
              <img src={process.env.PUBLIC_URL + item.img} width={"40px"} />
              {item.title}
            </ProfileListItem>
          ))}
        </ProfileList>
        <div>
          {editList.map((item) => (
            <ProfileEditButton border={"none"} bgColor={"#fff"}>
              <div style={{ display: "flex" }}>{item.title}</div>
              <div>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </ProfileEditButton>
          ))}
        </div>
      </ProfileWrapper>
      <Footer />
    </>
  );
};

export default Profile;
