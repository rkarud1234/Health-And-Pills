import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteUserExercise } from "../../../api/exercise";
import { fetchUserExercise } from "../../../api/users";
import useFetchData from "../../../hooks/useFetchData";
import useIntersect from "../../../hooks/useIntersect";
import UserInfoListItem from "../UserInfoListItem";

const UserInfoListWrapper = styled.div`
  padding: 20px 20px 20px 20px;
  overflow: scroll;
  height: 90vh;
`;

const EmptyContentWrapper = styled.div`
  text-align: center;
  padding-top: 20px;
`;

const Target = styled.div`
  height: 1px;
`;

const UserLike = () => {
  const { res } = useFetchData(fetchUserExercise);
  const navigate = useNavigate();
  const userLikes = useMemo(
    () =>
      res.data
        ? res.data.pages.flatMap((item) => {
            return item.data.content;
          })
        : [],
    [res.data]
  );

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (res.hasNextPage && !res.isFetching) {
      res.fetchNextPage();
    }
  });
  const goToDetail = (id) => {
    navigate(`/health/detail/${id}`, {
      state: { prevPath: "like", title: "좋아요" },
    });
  };
  return (
    <UserInfoListWrapper className="list-area">
      {userLikes.length !== 0 ? (
        userLikes.map((item) => (
          <UserInfoListItem
            key={item.relatedItemId}
            {...item}
            onClick={() => goToDetail(item.relatedItemId)}
            infoType={"like"}
          />
        ))
      ) : (
        <EmptyContentWrapper>
          <h1>등록된 정보가 없습니다.</h1>
        </EmptyContentWrapper>
      )}
      <Target ref={ref} />
    </UserInfoListWrapper>
  );
};

export default React.memo(UserLike);
