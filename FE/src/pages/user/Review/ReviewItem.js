import { Rating } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { deletePillReview } from "../../../api/pill";

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
  margin-right: 10px;
  width: 80px;
  /* height: 80px; */
  text-align: center;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  & img.default {
    width: 60%;
  }
`;

const ReviewInfoWrapper = styled.div`
  & span {
    background: -webkit-linear-gradient(#eee, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const ReviewContentWrapper = styled.div`
  padding: 8px 20px;
`;

const ButtonWrapper = styled.div`
  float: right;
`;

const ReviewItem = ({
  id,
  img,
  name,
  rating,
  relatedItemId,
  reviewContent,
  onClick,
}) => {
  const [review, setReview] = useState({
    id,
    img,
    name,
    rating,
    relatedItemId,
    reviewContent,
    readOnly: true,
  });
  const onChangeReadOnly = () => {
    setReview({ ...review, readOnly: !review.readOnly });
  };

  const cancleEdit = () => {
    setReview((prevState) => {
      return {
        ...prevState,
        rating,
        reviewContent,
      };
    });
  };

  const removeReview = async (reviewId) => {
    const res = await deletePillReview(reviewId);
    if (res.status === 200) {
      alert("삭제되었습니다.");
    }
  };

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
          <p>{review.name}</p>
          <div>
            <Rating
              name="rating"
              value={review.rating}
              readOnly={review.readOnly}
              onChange={(e, newValue) => {
                setReview({ ...review, [e.target.name]: newValue });
              }}
            />
          </div>
        </ReviewInfoWrapper>
      </ReviewImageInfoWrapper>
      <ReviewContentWrapper>
        <div>{review.reviewContent}</div>
        <ButtonWrapper>
          {review.readOnly ? (
            <>
              <button type="button" onClick={() => onClick(id)}>
                수정
              </button>
              <button type="button" onClick={() => removeReview(id)}>
                삭제
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => console.log("삐약")}>
                완료
              </button>
              <button type="button" onClick={onChangeReadOnly}>
                취소
              </button>
            </>
          )}
        </ButtonWrapper>
      </ReviewContentWrapper>
    </ReviewItemWrapper>
  );
};

export default ReviewItem;
