import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { deleteUserPill } from "../../../api/pill";
import { fetchUserPill } from "../../../api/users";
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

const UserPill = () => {
  const { res } = useFetchData(fetchUserPill);
  // const fetchUserPills = useCallback(() => {}, [res.data]);
  const userPills = useMemo(
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
    const res = await deleteUserPill(id);
    if (res.status === 200) {
      alert("삭제 되었습니다.");
    }
  };
  return (
    <UserInfoListWrapper className="list-area">
      {userPills.length !== 0 ? (
        <>
          {userPills.map((item) => (
            <UserInfoListItem
              key={item.relatedItemId}
              {...item}
              infoType={"pill"}
              onClick={deleteItem}
            />
          ))}
        </>
      ) : (
        <EmptyContentWrapper>
          <h1>등록된 정보가 없습니다.</h1>
        </EmptyContentWrapper>
      )}
      <Target ref={ref} />
    </UserInfoListWrapper>
  );
};

export default React.memo(UserPill);
