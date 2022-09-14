import { useRef, useState } from "react";
import styled from "styled-components";
import GradationButton from "../../components/buttons/GradationButton";

const LifeStyleWrapper = styled.div`
  padding: 80px 20px;
`;

const LifeStyleButtonWrapper = styled.div`
  display: grid;
  margin-top: 20px;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    background-color: transparent;
    border-radius: 10px;
    font-size: 24px;
    height: 82px;
    &.active {
      background-color: #d9d9d9;
    }
    & span {
      margin-top: 10px;
      font-size: 16px;
    }
  }
  @media screen and (max-width: 280px) {
    & button {
      font-size: 16px;
      height: 60px;

      & span {
        font-size: 12px;
      }
    }
  }
`;

const NumberOfExerciseWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  & div:first-child {
    margin-bottom: 20px;
  }
  & div:last-child {
    width: 100%;
    & select {
      border: 1px solid #000;
      width: 100%;
      text-align: center;
      font-size: 20px;
      border-radius: 6px;
      padding: 8px 12px;
    }
  }
  @media screen and (max-width: 280px) {
    & div:last-child select {
      font-size: 14px;
    }
  }
`;

const NUMBER_OF_EXERCISE = [
  { id: 1, title: "주 1 ~ 2회" },
  { id: 2, title: "주 3 ~ 4회" },
  { id: 3, title: "주 5 ~ 6회" },
  { id: 4, title: "매일" },
];

const LIFE_STYLE = [
  {
    id: 1,
    title: "다이어트",
    icon: <i className="fa-regular fa-weight-scale"></i>,
  },
  {
    id: 2,
    title: "보디빌딩",
    icon: <i className="fa-solid fa-stethoscope"></i>,
  },
  {
    id: 3,
    title: "건강관리",
    icon: <i className="fa-solid fa-dumbbell"></i>,
  },
  {
    id: 4,
    title: "기타",
    icon: <i className="fa-solid fa-sparkles"></i>,
  },
];
const LifeStyle = () => {
  const [lifeStyleState, setLifeStyleState] = useState({
    purposeOfExercise: 2,
    numberOfExercise: 1,
  });

  const purposeButton = useRef();
  const numberSelect = useRef();

  const onHandleLifeStyle = (e) => {
    console.log(e.target);
    console.log(e.target.name);
    setLifeStyleState({ ...lifeStyleState, [e.target.name]: e.target.value });
  };
  console.log(lifeStyleState);

  return (
    <LifeStyleWrapper>
      <div>운동목적</div>
      <LifeStyleButtonWrapper>
        {LIFE_STYLE.map((item) => (
          <button
            key={item.id}
            value={item.id}
            onClick={onHandleLifeStyle}
            ref={purposeButton}
            name={"purposeOfExercise"}
            className={
              item.id === lifeStyleState.purposeOfExercise ? "active" : ""
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </button>
        ))}
      </LifeStyleButtonWrapper>
      <NumberOfExerciseWrapper>
        <div>운동 횟수</div>
        <div>
          <select
            ref={numberSelect}
            onChange={onHandleLifeStyle}
            name={"numberOfExercise"}
          >
            {NUMBER_OF_EXERCISE.map((option) => (
              <option
                key={option.id}
                value={option.id}
                defaultValue={lifeStyleState.numberOfExercise === option.value}
              >
                {option.title}
              </option>
            ))}
          </select>
        </div>
      </NumberOfExerciseWrapper>
      <GradationButton
        text={"변경하기"}
        fontSize={"16px"}
        padding={"8px 16px"}
        height={"40px"}
      />
    </LifeStyleWrapper>
  );
};

export default LifeStyle;
