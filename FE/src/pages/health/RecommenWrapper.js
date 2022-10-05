import HealthCard from "../../components/cards/HealthCard";
import styled from "styled-components";
import Carousel from "../../components/carousel/Carousel";
import { useRef, useState, useEffect } from 'react'
import { getExerciseBest, getExerciseCustom, getExerciseUser } from "../../api/HealthAPI";
import { useNavigate } from 'react-router-dom';

    
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

const RecommendWrapper = () => {
    const navigate = useNavigate()

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
    console.log(startPageX, endPageX)
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
    useEffect(() => {
    getBest();
  }, [best.id])

    return (
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
                <div className="onclick-div"
                onClick={(e) => {
                    if (startPageX === endPageX) {
                    navigate(`/health/detail/${bests.id}`)
                    }
                }}
                >
                <HealthCard
                {...bests} key={bests.id}
                exerciseName={bests.name}
                exerciseId={bests.id}
                exerciseParts={bests.parts} />
                </div>
            )                
            )}
        </FlexBox>
      </RecoDivWrapper>
    )
}

export default RecommendWrapper