import React from "react";
import styled from "styled-components";

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

const purposes = [
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
const PurPoseOfExercise = ({ onClick, purposeOfExercise }) => {
  return (
    <div>
      <LifeStyleButtonWrapper>
        {purposes.map((item) => (
          <button
            key={item.id}
            value={item.id}
            onClick={onClick}
            type="button"
            name={"purposeOfExercise"}
            className={item.id === purposeOfExercise ? "active" : ""}
          >
            {item.icon}
            <span>{item.title}</span>
          </button>
        ))}
      </LifeStyleButtonWrapper>
    </div>
  );
};

export default React.memo(PurPoseOfExercise);
