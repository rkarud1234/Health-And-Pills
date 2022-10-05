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

const RecommendWrapper = ({type}) => {
    const navigate = useNavigate()
    
    const scrollRef = useRef(null);
    const [isDrag, setIsDrag] = useState(false);
    const [startX, setStartX] = useState();
    const [startPageX, setStartPageX] = useState();
    const [endPageX, setendPageX] = useState();
    
    const category = {
        best: '베스트 운동',
        custom: '사용자 맞춤 운동',
        user: '00대 00 운동'
    }
    const requestType = {
        best: getExerciseBest(),
        custom: getExerciseCustom(),
        user: getExerciseUser()
    }
    // console.log(category[type])

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
    const [exercises, setExercises] = useState([]);
    const getExercise = async () => {
        
        const response = await getExerciseBest();
        if (response.status === 200)
        setExercises([...response.data])
        console.log(response.data)
    };
    useEffect(() => {
    getExercise();
  }, [exercises.id])

    return (
        <RecoDivWrapper>
            <RecomWrapper>
                {category[type]}
            </RecomWrapper>
            <FlexBox
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
        >
            {exercises.map((exercise) => (
                <div className="onclick-div"
                onClick={(e) => {
                    if (startPageX === endPageX) {
                    navigate(`/health/detail/${exercise.id}`)
                    }
                }}
                >
                <HealthCard
                {...exercise} key={exercise.id}
                exerciseName={exercise.name}
                exerciseId={exercise.id}
                exerciseParts={exercise.parts} />
                </div>
            )                
            )}
        </FlexBox>
      </RecoDivWrapper>
    )
}

export default RecommendWrapper