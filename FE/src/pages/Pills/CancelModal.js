import React from 'react'
import styled from 'styled-components'
import { DeleteReview, PillReviewFetch } from '../../store/actions/pill'
import { useDispatch } from 'react-redux'

const Container = styled.div`
width: 40%;
max-width: 320px;
z-index: 999;
font-family: 'GmarketSans';
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: #EAEFF1;
border: 1px solid #7B7B7B;
border-radius: 4px;
`

const Btn = styled.div`
display: flex;
justify-content: center;
font-size: 12px;
font-family: 'GmarketSans';
width: 44%;
height: 24px;
line-height: 18px;
padding: 5px;
border-style: none;
border-radius: 6px;
background: #fff;
color: black;
cursor: pointer;
border: 1px solid black;
:hover {background: linear-gradient(180deg, #6A53FE 0%, #537CFE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border: 1px solid #6A53FE;
}
`



const CancelModal = ({ setModalOpen, reviewId, pillID }) => {
  const dispatch = useDispatch()
  const closeModal = () => {
    setModalOpen(false)
  }

  const deleteReviewHandler = () => {
    dispatch(DeleteReview(reviewId))
      .then(() => {
        dispatch(PillReviewFetch(pillID))
        setModalOpen(false)
      })

  }

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'end', padding: '8px 16px' }}>
        <div onClick={closeModal} style={{ cursor: 'pointer' }}>
          X
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 16px' }}>
        리뷰를 삭제하시겠습니까?
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px' }}>
        <Btn onClick={closeModal}>취소</Btn>
        <Btn onClick={deleteReviewHandler}>삭제</Btn>
      </div>
    </Container>
  )
}

export default CancelModal