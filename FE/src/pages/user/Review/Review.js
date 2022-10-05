import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import useFetchData from "../../../hooks/useFetchData";
import useIntersect from "../../../hooks/useIntersect";
import { fetchUserReview } from "../../../api/users";
import ReviewItem from "./ReviewItem";
import SlidingMenu from "../../../components/layouts/SlidingMenu";
import ReviewEdit from "./ReviewEdit";
import { deletePillReview, editPillReivew } from "../../../api/pill";

const UserInfoListWrapper = styled.div`
  overflow: scroll;
  height: calc(100vh - 120px);
`;

const EmptyContentWrapper = styled.div`
  text-align: center;
  padding-top: 20px;
`;

const Target = styled.div`
  height: 1px;
`;

const Review = () => {
  const { res, updateMutation, deleteMutation } = useFetchData(
    fetchUserReview,
    "review",
    editPillReivew,
    deletePillReview
  );
  const [editOpen, setEditOpen] = useState(false);
  const userData = { reviews: [] };
  const idRef = useRef(null);
  userData.reviews = useMemo(
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

  const openReviewEdit = (id) => {
    idRef.current = id;
    setEditOpen(true);
  };

  const closeReviewEdit = () => {
    setEditOpen(false);
  };

  const getReviewItem = () => {
    const item = userData.reviews.filter((item) => item.id === idRef.current);
    return item[0];
  };

  const editReview = async (reviewId, data) => {
    updateMutation.mutate({ reviewId, data });
    closeReviewEdit();
  };

  const deleteReview = async (reviewId) => {
    deleteMutation.mutate(reviewId);
    closeReviewEdit();
  };
  return (
    <UserInfoListWrapper className="list-area">
      {userData.reviews.length !== 0 ? (
        userData.reviews.map((item) => (
          <ReviewItem
            {...item}
            key={
              (Number.MAX_SAFE_INTEGER & item.id).toString(2).padStart(53, 0) +
              item.reviewContent
            }
            onClick={openReviewEdit}
            remove={deleteReview}
          />
        ))
      ) : (
        <EmptyContentWrapper>
          <h1>등록된 정보가 없습니다.</h1>
        </EmptyContentWrapper>
      )}
      <Target ref={ref} />
      <SlidingMenu
        active={editOpen}
        slidingMenuTitle={"리뷰 수정"}
        contents={
          <ReviewEdit
            id={idRef}
            key={idRef}
            {...getReviewItem()}
            close={closeReviewEdit}
            onClick={editReview}
          />
        }
        close={closeReviewEdit}
      />
    </UserInfoListWrapper>
  );
};

export default React.memo(Review);
