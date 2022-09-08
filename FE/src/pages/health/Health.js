import { useState } from "react";
import styled from "styled-components";
import Footer from "../../components/layouts/Footer";
import HealthFind from "./HealthFind";
import HealthRecommend from "./HealthRecommend";

  const TapWrapper = styled.div`
    width: 100vw;
  `

  const HealthButton = styled.button`
    background-color: ${({ color }) => color};
    color: ${({ textColor }) => textColor};
    font-size: 16px;
    cursor: pointer;
  `

const Health = () => {
  const [healthPage, setHealthPage] = useState("healthRecommend");
  const tabPage = {
    healthRecommend: <HealthRecommend/>,
    healthFind: <HealthFind/>
  }

  return (
    <>
      <TapWrapper>
        <HealthButton
          onClick = {() => setHealthPage("healthRecommend")}
          textColor = {healthPage === "healthRecommend" ? "#39C18E" : "#7b7b7b"}
        >
          추천 운동 보기
        </HealthButton>
        |
        <HealthButton
          onClick = {() => setHealthPage("healthFind")}
          textColor = {healthPage === "healthRecommend" ? "#7b7b7b" : "#39f2ac"}
        >
          직접 운동 찾기
        </HealthButton>
      </TapWrapper>
      <div>
        {tabPage[healthPage]}
      </div>
      <Footer/>
    </>
  );
};

export default Health;