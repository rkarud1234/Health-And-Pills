import React, { useState } from 'react'
import ReviewProgress from './ReviewProgress'
import styled from 'styled-components'
import { Rating } from '@mui/material'


const Container = styled.div`
box-sizing: border-box;
margin: 8px 8px;

background: #FFFFFF;
border: 1px solid #A6A4A4;
border-radius: 10px;
`
const ProFlexBox = styled.div`
display: flex;
margin: 8px;
`
const TextDiv = styled.div`
font-size: 12px;
text-align: center;
margin: 0px 4px;
font-weight: bold;
`
const LinearStar = styled.i`
font-weight: 900;
font-size: 20px;
/* identical to box height */
line-height: 28px;
margin: 4px 8px;

background: linear-gradient(180deg, #6A53FE 0%, #537CFE 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
`
const ReviewBtn = styled.button`
display: block;
background: #EAEFF1;
border: 1px solid #A6A4A4;
border-radius: 10px;
color: #A6A4A4;
font-size: 16px;
padding: 12px 32px;
margin: 8px
`
const GradientIcon = styled.i`
background: linear-gradient(180deg, #6A53FE 0%, #537CFE 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
`
const ReviewBox = styled.div`
box-sizing: border-box;
margin: 8px 8px;

background: #FFFFFF;
border: 1px solid #A6A4A4;
border-radius: 10px;
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

const PillReview = ({ id }) => {
  const reviews = [
    { id: 1, rating: 5, user: '김갑경', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 2, rating: 5, user: '한다빈', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 3, rating: 5, user: '이민우', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 4, rating: 5, user: '송상진', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 5, rating: 4, user: '김민정', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 6, rating: 3, user: '박상협', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 7, rating: 2, user: '류현수', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  ]
  const starRating = {
    starAverage: 4.4,
    fiveRating: 4,
    fourRating: 1,
    threeRating: 1,
    twoRating: 1,
    oneRating: 0
  }


  const fiveRating = (starRating.fiveRating / reviews.length) * 100 + '%'
  const fourRating = (starRating.fourRating / reviews.length) * 100 + '%'
  const threeRating = (starRating.threeRating / reviews.length) * 100 + '%'
  const twoRating = (starRating.twoRating / reviews.length) * 100 + '%'
  const oneRating = (starRating.oneRating / reviews.length) * 100 + '%'

  const [value, setValue] = useState(3)
  const [isOpened, setIsOpened] = useState(false)
  const [text, setText] = useState('')

  const registerHandler = () => {
    // 리뷰 등록 api
    setText('')
  }

  const cancelHandler = () => {
    setIsOpened(!isOpened)
    setText('')
  }

  const textHandler = (e) => {
    setText(e.target.value)
  }

  return (
    <>
      <Container>
        {reviews.length === 0
          ? <div style={{ borderBottom: '1px solid #A6A4A4', textAlign: 'center' }}>
            <GradientIcon style={{ marginTop: '32px' }} className="fa-regular fa-message-dots fa-2x"></GradientIcon>
            <div style={{ marginBottom: '32px', marginTop: '16px' }}>
              아직 작성된 리뷰가 없네요!
            </div>
          </div>
          : <div style={{ display: 'flex', borderBottom: '1px solid #A6A4A4' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '12px', marginTop: '16px' }}>
              <div style={{ fontSize: '16px' }}>
                사용자 총 평점
              </div>
              <ProFlexBox >
                <LinearStar className="fas fa-star"></LinearStar>
                <div style={{ fontSize: '32px' }}>{starRating.starAverage}</div>
              </ProFlexBox>
            </div>
            <div style={{ margin: '8px 8px' }}>
              <ProFlexBox>
                <TextDiv>
                  아주 좋아요
                </TextDiv>
                <ReviewProgress width={fiveRating} />
                <TextDiv>
                  {starRating.fiveRating}
                </TextDiv>
              </ProFlexBox>
              <ProFlexBox>
                <TextDiv>
                  맘에 들어요
                </TextDiv>
                <ReviewProgress width={fourRating} />
                <TextDiv>
                  {starRating.fourRating}
                </TextDiv>
              </ProFlexBox>
              <ProFlexBox>
                <TextDiv>
                  보통 이에요
                </TextDiv>
                <ReviewProgress width={threeRating} />
                <TextDiv>
                  {starRating.threeRating}
                </TextDiv>
              </ProFlexBox>
              <ProFlexBox>
                <TextDiv>
                  그저 그래요
                </TextDiv>
                <ReviewProgress width={twoRating} />
                <TextDiv>
                  {starRating.twoRating}
                </TextDiv>
              </ProFlexBox>
              <ProFlexBox>
                <TextDiv>
                  추천 안해요
                </TextDiv>
                <ReviewProgress width={oneRating} />
                <TextDiv>
                  {starRating.oneRating}
                </TextDiv>
              </ProFlexBox>
            </div>
          </div>}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginTop: '8px' }}>
            당신의 경험을 공유해 주세요!
          </div>
          <div>
            <ReviewBtn onClick={cancelHandler}>리뷰 작성하기</ReviewBtn>
          </div>
        </div>
      </Container>
      {
        isOpened ?
          <ReviewBox>
            <div style={{ margin: '12px 12px' }}>
              <div>
                이 영양제의 효과에 얼마나 만족하시나요?
              </div>
              <div>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
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
                value={text}
                autoFocus
                placeholder="다른 고객님에게 도움이 되도록 영양제에 대한 솔직한 평가를 남겨주세요."
                onChange={textHandler}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <BtnDiv onClick={cancelHandler}>
                닫기
              </BtnDiv>
              <BtnDiv ocClick={registerHandler}>
                등록
              </BtnDiv>
            </div>
          </ReviewBox>
          : <></>
      }
      {
        reviews ? reviews.map(review => {
          return (
            <ReviewBox key={review.id}>
              <div style={{ padding: '12px 12px', display: 'flex', borderBottom: '1px solid #A6A4A4' }}>
                <div style={{ marginTop: '2px' }}>
                  {review.user}
                </div>
                <Rating
                  style={{ margin: '0px 12px' }}
                  name="simple-controlled"
                  readOnly
                  value={review.rating}
                  size="small"
                  icon={<GradientIcon className="fas fa-star"></GradientIcon>}
                  emptyIcon={<i className="fa-thin fa-star"></i>}
                />
              </div>
              <div style={{ margin: '12px 12px' }}>
                {review.review}
              </div>
            </ReviewBox>
          )
        }) : <></>
      }
    </>
  )
}

export default PillReview