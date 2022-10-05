import { Rating } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import ReviewButton from "../../../components/buttons/review/ReviewButton";

const ReviewItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 90%;
  margin: 10px auto;
  border: 1px solid #cacaca;
  border-radius: 6px;
`;

const ReviewImageInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ReviewImageWrapper = styled.div`
  margin-right: 14px;
  width: 80px;
  height: 80px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 70px;
    height: 70px;
    object-fit: contain;
  }
  & img.default {
    width: 60px;
    height: 60px;
  }
`;

const ReviewInfoWrapper = styled.div`
  & span {
    background: -webkit-linear-gradient(#eee, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  & h1 {
    max-width: 240px;
    word-break: keep-all;
  }
  & div {
    margin-top: 4px;
  }
`;

const ReviewContentWrapper = styled.div`
  padding: 8px 18px;
  & p {
    line-height: 0.5cm;
  }
`;

const ButtonWrapper = styled.div`
  text-align: end;
`;

const ReviewItem = ({
  id,
  img,
  name,
  rating,
  relatedItemId,
  reviewContent,
  onClick,
  remove,
}) => {
  const [review, setReview] = useState({
    id,
    img,
    name,
    rating,
    relatedItemId,
    reviewContent,
  });
  return (
    <ReviewItemWrapper>
      <ReviewImageInfoWrapper>
        <ReviewImageWrapper>
          {review.img ? (
            <img src={review.img} alt={"pillImage"} />
          ) : (
            <img
              src={process.env.PUBLIC_URL + "/review/pills.png"}
              alt="상품 이미지 준비중"
              className="default"
            />
          )}
        </ReviewImageWrapper>
        <ReviewInfoWrapper>
          <h1>{review.name}</h1>
          <div>
            <Rating name="rating" value={review.rating} readOnly={true} />
          </div>
        </ReviewInfoWrapper>
      </ReviewImageInfoWrapper>
      <ReviewContentWrapper>
        <p>{review.reviewContent}</p>
      </ReviewContentWrapper>
      <ButtonWrapper>
        <ReviewButton onClick={() => onClick(id)} text={"수정"} status="edit" />
        <ReviewButton
          onClick={() => remove(id)}
          text={"삭제"}
          status={"delete"}
        />
      </ButtonWrapper>
    </ReviewItemWrapper>
  );
};

export default ReviewItem;
