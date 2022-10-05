import { useState } from "react";
import styled from "styled-components";
import RecommendBookMark from "../buttons/RecommendBookMark";
import UnRecommendBookMark from "../buttons/UnRecommendBookMark";
import { useNavigate } from "react-router-dom";
import { exerciseBookMark } from "../../api/HealthAPI";
import { useEffect } from "react";
import { getExerciseDetail, exerciseDoing } from "../../api/HealthAPI";
import Excercising from "../buttons/Exercising";
import UnExercising from "../buttons/UnExercising";

const HealthCardWrapper = styled.div`
  background-color: transparent;
  /* padding: 4px; */
  margin: 12px;
  justify-content: center;
`

const StyledHealthCard = styled.div`
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background-color: #fff;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: "6px 8px";
  cursor: pointer;
  position: relative;
  /* background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
`

const StyledHealthNameWrapper = styled.div`
  display: flex;
  font-size: 13px;
  padding: ${(props) => props.padding};
  font-weight: ${(props) => props.fontWeight};
  text-align: center;
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const HealthInfoWrapper = styled.div`
  font-size: 0.5rem;
  padding: ${(props) => props.padding};
`

const BookMarkWrapper = styled.div`
  background-color: ${({ color }) => color};
  position: absolute;
  top: -10px;
  right: 0px;

`

const DoingWrapper = styled.div`
  background-color: ${({ color }) => color};
  position: absolute;
  top: -6px;
  right: 24px;

`


const HealthCard = ({
  width, height, fontWeight,
  exerciseName, aerobic, exerciseParts, exerciseId,
}) => {  
  const [detail, setDetail] = useState({
    bookmark: "",
    doing: "",
    exerciseId: ""
  })

  // // 운동 상세 정보 조회
  // const getDetail = async () => {
  //   const response = await getExerciseDetail(exerciseId);
  //   setDetail({ ...response.data })
  // };
  // useEffect(() => {
  //   getDetail();
  // }, [detail.bookmark, detail.doing, exerciseId]);

  const onToggleBookMark = async (value) => {
    const data = {
      exerciseId: exerciseId,
      check: value
    };
    const response = await exerciseBookMark(data);
    setDetail((prevState) => {
      return {
        ...prevState, bookmark: value
      }
    });
  };

  const onToggleDoing = async (value) => {
    const data = {
      exerciseId: exerciseId,
      check: value
    };
    const response = await exerciseDoing(data);
    setDetail((prevState) => {
      return {
        ...prevState, doing: value
      }
    })
  };

  return (
    <>
      <HealthCardWrapper>
        <StyledHealthCard width={width} height={height}>
          <DoingWrapper>
            {detail.doing === "Y" ? <Excercising onClick={onToggleDoing} /> : <UnExercising onClick={onToggleDoing} />}
          </DoingWrapper>
          <BookMarkWrapper>
            {detail.bookmark === "Y" ? <UnRecommendBookMark onClick={onToggleBookMark} /> : <RecommendBookMark onClick={onToggleBookMark} />}
          </BookMarkWrapper>
          <div>
            <StyledHealthNameWrapper padding="16px 4px 4px" fontWeight={fontWeight}>
              <div>
                {exerciseName}
              </div>
            </StyledHealthNameWrapper>
          </div>
          -----
          <HealthInfoWrapper padding="0px 4px">
            {aerobic} | {exerciseParts}
          </HealthInfoWrapper>
        </StyledHealthCard>
      </HealthCardWrapper>
    </>
  );
};

export default HealthCard;

StyledHealthCard.defaultProps = {
  width: "120px",
  height: "80px",
  // padding: "6px 8px 6px 8px",
  fontWeight: "600",
}

// HealthCard.defaultProps = {
//   width: "120px",
//   height: "60px",
//   // padding: "6px 8px 6px 8px",
//   fontWeight: "600",
// }
