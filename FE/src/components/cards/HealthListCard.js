import { useState } from "react";
import styled from "styled-components";
import BookMark from "../buttons/BookMark";
import UnBookMark from "../buttons/UnBookMark";
import { useNavigate } from "react-router-dom";
import { exerciseBookMark } from "../../api/HealthAPI";
import { useEffect } from "react";
import { getExerciseDetail, exerciseDoing } from "../../api/HealthAPI";
import Excercising from "../buttons/Exercising";
import UnExercising from "../buttons/UnExercising";
import TagCard from "./TagCard";

const HealthCardWrapper = styled.div`
  background-color: transparent;
  /* padding: 4px; */
  margin: 0px 10px;
  justify-content: center;
`;

const StyledHealthCard = styled.div`
  border-radius: 5px;
  box-shadow: 0 2px 3.5px rgba(0, 0, 0, 0.23);
  background-color: #fff;
  width: 100%;
  height: 100px;
  padding: 10px 10px;
  cursor: pointer;
  margin: 20px 0;
  justify-content: center;
  position: relative;
  /* background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
`;

const HealthContentWrapper = styled.div`
  margin-top: 0px;
  display: flex;
  align-item: center;
  justify-content: space-between;
`;

const HealthNameWrapper = styled.div``;

const StyledHealthNameWrapper = styled.div`
  display: inline-block;
  margin: 10px 10px;
  font-size: 17px;
  font-weight: bold;
  color: #537cfe;
`;

const StyledAerobicWrapper = styled.div`
  display: inline-block;
  font-weight: bold;
  font-size: 13px;
  color: #454545;
  padding: 0;
`;

const BookMarkWrapper = styled.div`
  position: absolute;
  top: -5.5px;
  right: 10px;
`;

const DoingWrapper = styled.div`
  display: inline-block;
  align-item: center;
  background: linear-gradient(#537cfe, #6a53fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
  cursor: pointer;
  margin: auto 10px;
`;

const HealthListCard = ({
  exerciseName,
  aerobic,
  exerciseParts,
  exerciseId,
}) => {
  const navigate = useNavigate();

  const [detail, setDetail] = useState({
    bookmark: "",
    doing: "",
    exerciseId: "",
  });

  // 운동 상세 정보 조회
  const getDetail = async () => {
    const response = await getExerciseDetail(exerciseId);
    setDetail({ ...response.data });
  };
  useEffect(() => {
    getDetail();
  }, [detail.bookmark, detail.doing, exerciseId]);

  const onToggleBookMark = async (value) => {
    const data = {
      exerciseId: exerciseId,
      check: value,
    };
    const response = await exerciseBookMark(data);
    setDetail((prevState) => {
      return {
        ...prevState,
        bookmark: value,
      };
    });
  };

  const onToggleDoing = async (value) => {
    const data = {
      exerciseId: exerciseId,
      check: value,
    };
    const response = await exerciseDoing(data);
    setDetail((prevState) => {
      return {
        ...prevState,
        doing: value,
      };
    });
  };

  return (
    <>
      <HealthCardWrapper>
        <StyledHealthCard
          onClick={() => {
            navigate(`/health/detail/${exerciseId}`);
          }}
        >
          <BookMarkWrapper>
            {detail.bookmark === "Y" ? (
              <UnBookMark onClick={onToggleBookMark} />
            ) : (
              <BookMark onClick={onToggleBookMark} />
            )}
          </BookMarkWrapper>
          <HealthContentWrapper>
            <HealthNameWrapper>
              <div>
                <StyledHealthNameWrapper>
                  {exerciseName}
                </StyledHealthNameWrapper>
                <StyledAerobicWrapper>{aerobic}</StyledAerobicWrapper>

                <DoingWrapper>
                  {detail.doing === "Y" ? (
                    <i className="fa-solid fa-check"></i>
                  ) : (
                    <></>
                  )}
                </DoingWrapper>
              </div>
              {exerciseParts.map((item, i) => {
                return <TagCard item={item} />;
              })}
            </HealthNameWrapper>
          </HealthContentWrapper>
        </StyledHealthCard>
      </HealthCardWrapper>
    </>
  );
};

export default HealthListCard;

StyledHealthCard.defaultProps = {
  width: "120px",
  height: "72px",
  // padding: "6px 8px 6px 8px",
  fontWeight: "600",
};

// HealthCard.defaultProps = {
//   width: "120px",
//   height: "60px",
//   // padding: "6px 8px 6px 8px",
//   fontWeight: "600",
// }
