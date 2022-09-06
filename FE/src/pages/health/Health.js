import { useState } from "react";
import styled from "styled-components";
import Footer from "../../components/layouts/Footer";
import HealthFind from "./HealthFind";
import HealthRecommend from "./HealthRecommend";

const Health = () => {
  const [healthPage, setHealthPage] = useState("health");


  const TapWrapper = styled.div`
    width: 100vw;
  `

  const HealthButton = styled.button`
    background-color: ${({ color }) => color};
    color: ${({ textColor }) => textColor};
    font-size: 16px;
    cursor: pointer;
  `

  return (
    <>
      <TapWrapper>
        <HealthButton
          onClick = {() => setHealthPage("health")}
          textColor = {healthPage === "health" ? "#39f2ac" : "#7b7b7b"}
        >
          추천 운동 보기
        </HealthButton>
        |
        <HealthButton
          onClick = {() => setHealthPage("healthFind")}
          textColor = {healthPage === "health" ? "#7b7b7b" : "#39f2ac"}
        >
          직접 운동 찾기
        </HealthButton>
      </TapWrapper>
      <div>
        {healthPage === "health" ? (
          <HealthRecommend />
        ) : (
          <HealthFind />
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Health;