import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

const RatingWrapper = styled.div`
  text-align: center;
`;

const ReviewItemImageWrapper = styled.div`
  text-align: center;
`;
const ReviewContentWrapper = styled.div`
  width: 100%;
  padding: 0px 20px;
  text-align: center;
  position: relative;
  margin-top: 20px;
  & label {
    width: 80px;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    background-color: #fff;
    border: none;
    @media screen and (min-width: 280px) {
      font-size: 14px;
    }
  }
  & textarea {
    width: 100%;
    border: 1px solid #cacaca;
    padding: 14px;
    font-size: 16px;
    height: 500px;
    border-radius: 6px;
    resize: none;
    @media screen and (min-width: 500px) {
      font-size: 16px;
      height: 450px;
    }
    @media screen and (max-width: 390px) {
      font-size: 16px;
      height: 400px;
    }
    @media screen and (max-width: 280px) {
      font-size: 14px;
      height: 220px;
    }
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  float: right;
  padding: 0 20px;
`;
const ReviewEdit = ({ id, img, rating, reviewContent, onClick, close }) => {
  const [review, setReview] = useState({
    score: rating,
    content: reviewContent,
  });

  useEffect(() => {
    setReview({ score: rating, content: reviewContent });
  }, [rating, reviewContent]);
  const editPillReview = () => {
    onClick(id, { ...review });
  };

  const onHandleInput = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const reset = () => {
    setReview({ score: rating, content: reviewContent });
    close();
  };

  return review.content ? (
    <>
      <div>
        <ReviewItemImageWrapper>
          <img src={img} width={200} height={200} alt={"상품이미지"} />
        </ReviewItemImageWrapper>
        <div>
          <RatingWrapper>
            <Rating
              name="score"
              value={review.score}
              onChange={(e, newRating) => {
                setReview({ ...review, [e.target.name]: newRating });
              }}
              size="large"
            />
          </RatingWrapper>

          <ReviewContentWrapper>
            <label htmlFor="reviewContent">리뷰 내용</label>
            <textarea
              id={"reviewContent"}
              name={"content"}
              value={review.content}
              onChange={onHandleInput}
            />
          </ReviewContentWrapper>
        </div>
        <ButtonWrapper>
          <button type="button" onClick={() => editPillReview(id)}>
            수정완료
          </button>
          <button type="button" onClick={reset}>
            취소
          </button>
        </ButtonWrapper>
      </div>
    </>
  ) : (
    <>Loading...</>
  );
};

export default ReviewEdit;
