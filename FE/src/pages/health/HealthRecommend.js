import HealthCard from "../../components/cards/HealthCard";
import styled from "styled-components";
import Carousel from "../../components/carousel/Carousel";
import imgUrl from "../../assets/togetherX.jpg";
import stretching from "../../assets/stretching.jpg"
import { useRef, useState, useEffect } from 'react'
import { getExerciseBest, getExerciseCustom, getExerciseUser } from "../../api/HealthAPI";

const RecoDivWrapper = styled.div`
  padding: 4px;
`

const RecomWrapper = styled.div`
  font-size: large;
  padding: 4px 2px 4px 2px;
`

const RecommendWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    { id: 2, url: stretching },
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

  // 베스트 운동 추천
  const [best, setBest] = useState([]);
  const getBest = async () => {
    const response = await getExerciseBest();
    if (response.status === 200)
    setBest([...response.data])
  };

  // 사용자 맞춤 운동 추천
  const [custom, setCustom] = useState([]);
  const getCustom = async () => {
    const response = await getExerciseCustom();
    if (response.status === 200)
    setCustom([...response.data])
  };

  // 유사한 사용자 운동 추천
  const [user, setUser] = useState([]);
  const getUser = async () => {
    const response = await getExerciseUser();
    if (response.status === 200)
    setUser([...response.data])
  };

  useEffect(() => {
    getBest();
    getCustom();
    getUser();
  }, [best.id, custom.id, user.id])
  


  return (
    <>
      <div>
        <Carousel images={images} />
      </div>
      <RecoDivWrapper>
        <RecomWrapper>
            베스트 운동
        </RecomWrapper>
        <FlexBox
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        {best.map((bests) => (
          <HealthCard
            {...bests} key={bests.id}
            exerciseName={bests.name}
            exerciseId={bests.id}
            exerciseParts={bests.parts}
          />
        ))}
      </FlexBox>
      </RecoDivWrapper>
      <RecoDivWrapper>
        <RecomWrapper>
          사용자 맞춤 운동 추천
        </RecomWrapper>
        <FlexBox
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        {custom.map((customs) => (
          <HealthCard
            {...customs} key={customs.id}
            exerciseName={customs.name}
            exerciseId={customs.id}
            exerciseParts={customs.parts}
          />
        ))}
      </FlexBox>
      </RecoDivWrapper>
      <RecoDivWrapper>
        <RecomWrapper>
          유사한 사용자 추천
        </RecomWrapper>
        <FlexBox
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        {user.map((users) => (
          <HealthCard
            {...users} key={users.id}
            exerciseName={users.name}
            exerciseId={users.id}
            exerciseParts={users.parts}
          />
        ))}
      </FlexBox>
      </RecoDivWrapper>
    </>
  );
};

export default HealthRecommend;