import React, { useMemo } from "react";
import styled from "styled-components";
import {
  fetchUserExerciseBookmark,
  fetchUserPill,
  fetchUserPillBookmark,
} from "../../../api/users";
import useFetchData from "../../../hooks/useFetchData";
import useIntersect from "../../../hooks/useIntersect";
import UserInfoListItem from "../UserInfoListItem";

const UserInfoListWrapper = styled.div`
  padding: 20px 20px 20px 20px;
  overflow: scroll;
  height: 80vh;
`;

const EmptyContentWrapper = styled.div`
  text-align: center;
  padding-top: 20px;
`;

const Target = styled.div`
  height: 1px;
`;

const fetchUrl = {
  pill: fetchUserPillBookmark,
  exercise: fetchUserExerciseBookmark,
};
const UserBookmark = ({ type }) => {
  const { res } = useFetchData(fetchUrl[type]);
  const userBookmark = useMemo(
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
  const deleteItem = async (id) => {
    // const res = await deleteUserExercise(id);
    // if (res.status === 200) {
    //   alert("삭제 되었습니다.");
    // }
    console.log("북마크 해제하기");
  };
  return (
    <UserInfoListWrapper className="list-area">
      {userBookmark.length !== 0 ? (
        userBookmark.map((item) => (
          <UserInfoListItem
            key={item.relatedItemId}
            {...item}
            infoType={type}
            onClick={deleteItem}
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

export default React.memo(UserBookmark);
