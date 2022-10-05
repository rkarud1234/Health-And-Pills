import React from 'react'
import styled from 'styled-components'
import { DeleteReview, PillDetailFetch } from '../../store/actions/pills'
import { useDispatch } from 'react-redux'

const Container = styled.div`
width: 60%;
max-width: 320px;
z-index: 999;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -90%);
background-color: #fff;
border: 1px solid #d6d6d6;
border-radius: 4px;
`

const BtnDiv = styled.div`
// background: linear-gradient(to right, #537CFE 0%, #6A53FE 100%);
font-size: 12px;
text-align: center;
border: 1.1px solid #537CFE;
border-radius: 8px;
padding: 6px 10px;
margin: 8px 6px;
cursor: pointer;
color: #537CFE;
`
const BtnDivCancel = styled.div`
font-size: 12px;
text-align: center;
border: 1px solid #e0e0e0;
border-radius: 8px;
padding: 6px 10px;
margin: 8px 6px;
cursor: pointer;
`



const CancelModal = ({ setModalOpen, reviewId, pillID }) => {
  const dispatch = useDispatch()
  const closeModal = () => {
    setModalOpen(false)
  }

  const deleteReviewHandler = () => {
    dispatch(DeleteReview(reviewId))
      .then(() => {
        dispatch(PillDetailFetch(pillID))
        setModalOpen(false)
      })

  }

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'end', padding: '8px 16px' }}>
        <div onClick={closeModal} style={{ cursor: 'pointer' }}>
          <i className='fa-regular fa-close'></i>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 16px' }}>
        리뷰를 삭제하시겠습니까?
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px' }}>
        <BtnDivCancel onClick={closeModal}>취소</BtnDivCancel>
        <BtnDiv onClick={deleteReviewHandler}>삭제</BtnDiv>
      </div>
    </Container>
  )
}

export default CancelModal