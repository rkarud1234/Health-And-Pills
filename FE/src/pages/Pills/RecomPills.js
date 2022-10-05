import React, { useRef, useState } from 'react'
import styled from 'styled-components'
// import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import PillCard from '../../components/cards/PillCard.js'


const TextDiv = styled.div`
margin: 24px 0 0 16px;
`
const Text = styled.div`
font-size: 16px;
font-weight: bold;
`

const CardDiv = styled.div`
margin: 0px 12px
`

const FlexBox = styled.div`
::-webkit-scrollbar {
  display: none;
} /* Chrome, Safari, Opera 환경*/
scrollbar-width: none; /* firefox 환경 */
cursor: pointer;
display: flex;
overflow-x: scroll;
padding: 16px 0px 24px;
`

const RecomPills = ({ pills, text }) => {
  const navigate = useNavigate()

  // 클릭 앤 드래그로 스크롤 이동시키기
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const [startPageX, setStartPageX] = useState();
  const [endPageX, setendPageX] = useState();
  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartPageX(e.pageX)
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = (e) => {
    setendPageX(e.pageX)
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };

  return (
    <>
      <TextDiv>
        <Text>
          {text}
        </Text>
      </TextDiv>

      <FlexBox
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        {pills ? pills.map(pill => {
          return (
            <CardDiv
              key={pill.pillId}
              onClick={() => {
                if (startPageX === endPageX) {
                  navigate(`/pill/detail/${pill.pillId}`)
                }
              }}>
              <PillCard url={pill.pillThumbnail} text={pill.pillName} rating={pill.pillReviewCount} />
            </CardDiv>
          )
        }) : <></>}
      </FlexBox>
    </>
  )
}

export default RecomPills