import styled from "styled-components";
import UserInfoListItem from "./UserInfoListItem";

const UserInfoListWrapper = styled.div`
  padding: 20px 20px 0px 20px;
`;

const EmptyContentWrapper = styled.div`
  text-align: center;
  padding-top: 20px;
`;
const UserInfoList = ({ infoList, deleteUserInfo, type }) => {
  return (
    <UserInfoListWrapper>
      {infoList !== undefined && infoList.length !== 0 ? (
        infoList.map((item) => (
          <UserInfoListItem
            key={item.id}
            {...item}
            deleteUserInfo={deleteUserInfo}
            type={type}
          />
        ))
      ) : (
        <EmptyContentWrapper>
          <h1>등록된 정보가 없습니다.</h1>
        </EmptyContentWrapper>
      )}
    </UserInfoListWrapper>
  );
};

export default UserInfoList;
