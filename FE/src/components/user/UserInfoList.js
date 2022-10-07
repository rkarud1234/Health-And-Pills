import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { fetchUserExercise, fetchUserPill, getUserInfo } from "../../api/users";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import UserInfoListItem from "./UserInfoListItem";

const UserInfoListWrapper = styled.div`
  padding: 20px 20px 20px 20px;
  overflow: scroll;
  height: 90vh;
`;

const EmptyContentWrapper = styled.div`
  text-align: center;
  padding-top: 20px;
`;

const fetchUrl = {
  pill: fetchUserPill,
  exercise: fetchUserExercise,
};
const UserInfoList = ({ infoType }) => {
  const { data, isFetching } = useInfiniteScroll(fetchUrl[infoType]);
  const onHandleDeleteData = () => {};
  return (
    <UserInfoListWrapper className="list-area">
      {data.length !== 0 ? (
        data.map((item, idx) => (
          <UserInfoListItem
            key={idx}
            {...item}
            deleteUserInfo={onHandleDeleteData}
            infoType={infoType}
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

export default React.memo(UserInfoList);
