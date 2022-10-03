import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteUserExercise } from "../../../api/exercise";
import { fetchUserExercise } from "../../../api/users";
import useFetchData from "../../../hooks/useFetchData";
import useIntersect from "../../../hooks/useIntersect";
import DeleteItemButton from "../../buttons/DeleteItemButton";
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

const UserExercise = () => {
  const { res } = useFetchData(fetchUserExercise);
  const navigate = useNavigate();
  const userExercises = useMemo(
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
    const res = await deleteUserExercise(id);
    if (res.status === 200) {
      alert("삭제 되었습니다.");
    }
  };

  const goToDetail = (id) => {
    navigate(`/health/detail/${id}`);
  };
  return (
    <UserInfoListWrapper className="list-area">
      {userExercises.length !== 0 ? (
        userExercises.map((item) => (
          <UserInfoListItem
            key={item.relatedItemId}
            {...item}
            infoType={"exercise"}
            onClick={() => goToDetail(item.id)}
            children={
              <DeleteItemButton
                text={"삭제"}
                onClick={deleteItem}
                id={item.relatedItemId}
              />
            }
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

export default React.memo(UserExercise);
