import { useState } from "react";
import styled from "styled-components";
import Footer from "../../components/layouts/Footer";
import HealthFind from "./HealthFind";
import HealthRecommend from "./HealthRecommend";

// const CardWrapper = styled.div`
//   margin: auto;
//   align-items: center;
// `

const HealthButton = styled.button`
  color: ${({ textColor }) => textColor};
  font-size: 16px;
  cursor: pointer;
  background: ${({backgroundColor}) => backgroundColor};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: ${({fontWeight}) => fontWeight};
`

const Health = () => {
  const [healthPage, setHealthPage] = useState("healthRecommend");
  const tabPage = {
    healthRecommend: <HealthRecommend/>,
    healthFind: <HealthFind/>
  }

  return (
    <>
        <HealthButton
          onClick = {() => setHealthPage("healthRecommend")}
          backgroundColor = {healthPage === "healthRecommend" ? "linear-gradient(#537CFE, #6A53FE)" : "gray"}
          fontWeight = {healthPage === "healthRecommend" ? "bolder" : "normal"}
        >
          추천 운동 보기
        </HealthButton>
        |
        <HealthButton
          onClick = {() => setHealthPage("healthFind")}
          backgroundColor = {healthPage === "healthFind" ? "linear-gradient(#537CFE, #6A53FE)" : "gray"}
          fontWeight = {healthPage === "healthFind" ? "bolder" : "normal"}
        >
          직접 운동 찾기
        </HealthButton>
      <div>
        {tabPage[healthPage]}
      </div>
      <Footer/>
    </>
  );
};

export default Health;