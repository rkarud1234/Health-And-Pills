import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ReviewButton from "../../../components/buttons/review/ReviewButton";
import Loading from "../../../components/layouts/Loading";

const ReviewEditWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & div {
    width: 100%;
  }
`;
const RatingWrapper = styled.div`
  text-align: center;
`;

const ReviewItemImageWrapper = styled.div`
  text-align: center;
  & img {
    width: 100px;
    height: 100px;
  }
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
  text-align: end;
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
    if (e.target.name === "content" && e.target.value.length > 255) {
      alert("리뷰는  최대 255자까지 등록가능합니다.");
      return;
    }
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const reset = () => {
    setReview({ score: rating, content: reviewContent });
    close();
  };
  return id ? (
    <ReviewEditWrapper>
      <div>
        <ReviewItemImageWrapper>
          {img !== "" ? (
            <img src={img} width={200} height={200} alt={"상품이미지"} />
          ) : (
            <img
              src={process.env.PUBLIC_URL + "/review/pills.png"}
              alt="상품 이미지 준비중"
            />
          )}
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
          <ReviewButton
            type="button"
            onClick={editPillReview}
            text={"수정완료"}
            status={"edit"}
            width={"60px"}
          />
          <ReviewButton
            onClick={reset}
            text={"취소"}
            status={"cancle"}
            width={"60px"}
          />
        </ButtonWrapper>
      </div>
    </ReviewEditWrapper>
  ) : (
    <>
      <Loading />
    </>
  );
};

export default ReviewEdit;
