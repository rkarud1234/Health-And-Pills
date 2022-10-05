import React from 'react'
import styled from 'styled-components'
import { Rating } from '@mui/material'

const ReviewContainer = styled.div`
box-sizing: border-box;
margin: 8px 16px;
background: #FFFFFF;
border: 1px solid #CAD1D5;
border-radius: 8px;
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
 border: 1px solid #CAD1D5;
 border-radius: 8px;
 padding: 6px;
 :focus {outline: none;};
 overflow-y: hidden;
 resize: none;
`
const BtnDiv = styled.div`
// background: linear-gradient(to right, #537CFE 0%, #6A53FE 100%);
font-size: 14px;
text-align: center;
border: 1.1px solid #537CFE;
border-radius: 8px;
padding: 6px 10px;
margin: 8px 6px;
cursor: pointer;
color: #537CFE;
`

const BtnDivCancel = styled.div`
font-size: 14px;
text-align: center;
border: 1px solid #e0e0e0;
border-radius: 8px;
padding: 6px 10px;
margin: 8px 6px;
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight:'10px' }}>
          <BtnDivCancel onClick={cancelHandler}>
            취소
          </BtnDivCancel>
          <BtnDiv onClick={createReviewHandler}>
            등록
          </BtnDiv>
        </div>
        : <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <BtnDivCancel onClick={updatingHandler}>
            취소
          </BtnDivCancel>
          <BtnDiv onClick={() => { updateReviewHandler(reviewId) }}>
            수정
          </BtnDiv>
        </div>
      }
    </ReviewContainer>
  )
}

export default ReviewBox