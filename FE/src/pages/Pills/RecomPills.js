import React, { useRef, useState } from 'react'
import styled from 'styled-components'
// import { useSelector } from "react-redux";
import PillCard from '../../components/cards/PillCard.js'


const TextDiv = styled.div`
margin: 24px 0 0 16px;
`
const Text = styled.div`
font-size: 16px;
font-weight: bold;
`

const CardDiv = styled.div`
margin: 0px 16px
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

const RecomPills = ({ pills, type }) => {
  // const user = useSelector((state) => state.user);
  const username = '춘식이'

  // 클릭 앤 드래그로 스크롤 이동시키기
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);

    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };

  let text = null

  if (type === 'user') {
    text = <Text>'{username}' 님을 위한 맞춤 영양제 추천</Text>
  } else if (type === 'age') {
    text = <Text>20대 여성이 많이 찾는 영양제 추천</Text>
  }

  return (
    <>
      <TextDiv>
        {text}
      </TextDiv>
      <FlexBox
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        {pills ? pills.map(pill => {
          return (<CardDiv key={pill.id}>
            <PillCard url={pill.url} text={pill.text} rating={pill.rating} />
          </CardDiv>)
        }) : <></>}
      </FlexBox>
    </>
  )
}

export default RecomPills