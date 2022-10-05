import HealthCard from "../../components/cards/HealthCard";
import styled from "styled-components";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const RecoDivWrapper = styled.div`
  padding: 4px;
`;

const RecomWrapper = styled.div`
  font-size: large;
  font-weight: bold;
  padding: 4px 2px 4px 12px;
`;
const FlexBox = styled.div`
  ::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera 환경*/
  scrollbar-width: none; /* firefox 환경 */
  cursor: pointer;
  display: flex;
  overflow-x: scroll;
  margin: 0px 0px 16px;
`;

const RecommendWrapper = ({ text, user, exercises }) => {
  const navigate = useNavigate();

  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const [startPageX, setStartPageX] = useState();
  const [endPageX, setendPageX] = useState();

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartPageX(e.pageX);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = (e) => {
    setendPageX(e.pageX);
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };
  return (
    <RecoDivWrapper>
      <RecomWrapper>
        <span style={{ color: "#537cfe" }}>{user}</span>
        {text}
      </RecomWrapper>
      <FlexBox
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        {exercises &&
          exercises.map((exercise) => (
            <div
              className="onclick-div"
              style={{ position: "relative" }}
              key={exercise.id}
              onClick={(e) => {
                e.stopPropagation();
                if (startPageX === endPageX) {
                  navigate(`/health/detail/${exercise.id}`, { state: true });
                }
              }}
            >
              <HealthCard
                {...exercise}
                key={exercise.id}
                exerciseName={exercise.name}
                exerciseId={exercise.id}
                exerciseParts={exercise.parts}
              />
            </div>
          ))}
      </FlexBox>
    </RecoDivWrapper>
  );
};

export default RecommendWrapper;
