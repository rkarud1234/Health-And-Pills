import { useState } from "react";
import styled from "styled-components";
import PurPoseOfExercise from "../../../components/user/PurPoseOfExercise";
import TimesOfExercise from "../../../components/user/TimesOfExercise";
import { PrevNextButtonWrapper } from "./FirstInformation";

const SecondInformationWrapper = styled.div`
  height: 60vh;
  margin-top: 50px;
  position: relative;
  animation: fadeIn 1s ease-in-out;
  @keyframes fadeIn {
    from {
      top: 100px;
      opacity: 0;
    }
    to {
      top: 0px;
      opacity: 1;
    }
  }
`;

const InformationImageWrapper = styled.div`
  display: flex;
  margin-bottom: 40px;

  display: flex;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & img {
    width: 150px;
  }
  & span {
    margin-top: 10px;
    font-family: "NanumSquareRound";
  }
`;
const ExercisePurposeWrapper = styled.div`
  padding: 0px 10px;
  & div:first-child {
    font-size: 18px;
    margin-left: 10px;
    font-family: "NanumSquareRound";
  }
`;

const ExerciseTimesWrapper = styled.div`
  padding: 0px 20px;
  margin-top: 20px;
  & div:first-child {
    font-size: 18px;
    font-family: "NanumSquareRound";
  }
`;
const SecondInformation = ({
  purposeOfExercise,
  timesOfExercise,
  changeType,
  changeInformation,
  submit,
}) => {
  const onHandlePurposeOfExercise = (e) => {
    changeInformation({
      [e.currentTarget.name]: parseInt(e.currentTarget.value),
    });
  };

  const onHandleTimesOfExercise = (e) => {
    changeInformation({
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const onHandleType = (type) => {
    changeType(type);
  };
  return (
    <SecondInformationWrapper>
      <InformationImageWrapper>
        <img src={process.env.PUBLIC_URL + "/profile/weights.png"} />
        <span>운동정보를 입력해주세요.</span>
      </InformationImageWrapper>
      <ExercisePurposeWrapper>
        <div>운동목적</div>
        <PurPoseOfExercise
          purposeOfExercise={purposeOfExercise}
          onClick={onHandlePurposeOfExercise}
        />
      </ExercisePurposeWrapper>
      <ExerciseTimesWrapper>
        <div>운동횟수</div>
        <TimesOfExercise
          timesOfExercise={timesOfExercise}
          onChange={onHandleTimesOfExercise}
        />
      </ExerciseTimesWrapper>
      <PrevNextButtonWrapper>
        <button type="button" onClick={() => onHandleType("first")}>
          뒤로가기
        </button>
        <button
          className={
            purposeOfExercise !== "" && timesOfExercise !== "" ? "active" : ""
          }
          type="button"
          onClick={submit}
        >
          완료
        </button>
      </PrevNextButtonWrapper>
    </SecondInformationWrapper>
  );
};

export default SecondInformation;
