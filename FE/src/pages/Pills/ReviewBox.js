import React from 'react'
import styled from 'styled-components'
import { Rating } from '@mui/material'

const ReviewContainer = styled.div`
box-sizing: border-box;
margin: 8px 16px;
background: #FFFFFF;
border: 1px solid #A6A4A4;
border-radius: 10px;
`
const GradientIcon = styled.i`
background: linear-gradient(180deg, #6A53FE 0%, #537CFE 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
`
const TextBox = styled.textarea`
 width: 92%;
 height: 80px;
 border: 1px solid #A6A4A4;
 :focus {outline: none;};
 overflow-y: hidden;
 resize: none;
`
const BtnDiv = styled.div`
font-size: 16px;
text-align: center;
margin: 8px 12px;
font-weight: bold;
cursor: pointer;
`

const ReviewBox = ({
  createReviewHandler,
  cancelHandler,
  updatingHandler,
  setScore,
  textHandler,
  score,
  defaultScore,
  defaultText,
  updateReviewHandler,
  reviewId }) => {


  return (
    <ReviewContainer>
      <div style={{ margin: '12px 12px' }}>
        <div>
          이 영양제의 효과에 얼마나 만족하시나요?
        </div>
        <div>
          <Rating
            name="simple-controlled"
            defaultValue={defaultScore}
            value={score}
            onChange={(event, newScore) => {
              setScore(newScore);
            }}
            size="small"
            icon={<GradientIcon className="fas fa-star"></GradientIcon>}
            emptyIcon={<i className="fa-thin fa-star"></i>}
          />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <TextBox
          type="text"
          defaultValue={defaultText}
          autoFocus
          placeholder="다른 고객님에게 도움이 되도록 영양제에 대한 솔직한 평가를 남겨주세요."
          onChange={textHandler}
        />
      </div>
      {createReviewHandler ?
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <BtnDiv onClick={cancelHandler}>
            닫기
          </BtnDiv>
          <BtnDiv onClick={createReviewHandler}>
            등록
          </BtnDiv>
        </div>
        : <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <BtnDiv onClick={updatingHandler}>
            닫기
          </BtnDiv>
          <BtnDiv onClick={() => { updateReviewHandler(reviewId) }}>
            수정
          </BtnDiv>
        </div>
      }
    </ReviewContainer>
  )
}

export default ReviewBox