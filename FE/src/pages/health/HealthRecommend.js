import HealthCard from "../../components/cards/HealthCard";
import styled from "styled-components";
import Carousel from "../../components/carousel/Carousel";
import imgUrl from "../../assets/togetherX.jpg";
import { useRef, useState, useEffect } from 'react'
import { getExerciseBest, getExerciseCustom, getExerciseUser } from "../../api/HealthAPI";
import RecommendWrapper from "./RecommenWrapper";

const RecoDivWrapper = styled.div`
  padding: 4px;
`

const RecomWrapper = styled.div`
  font-size: large;
  padding: 4px 2px 4px 2px;
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


const HealthRecommend = () => {

  const images = [
    { id: 1, url: imgUrl },
    { id: 2, url: imgUrl },
    { id: 3, url: imgUrl },
    { id: 4, url: imgUrl },
    { id: 5, url: imgUrl },
    { id: 6, url: imgUrl },
  ]

  // 아이템 횡스크롤
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
      <div>
        <Carousel images={images} />
      </div>
      <RecommendWrapper type='best' />
      <RecommendWrapper type='custom'/>
      <RecommendWrapper type='user'/>
    </>
  );
};

export default HealthRecommend;