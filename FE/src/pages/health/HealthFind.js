import { useState } from "react";
import styled from "styled-components";
import HealthFindType from "./HealthFindType"
import HealthFindPart from "./HealthFindPart"

  const TapWrapper = styled.div`
    width: 100vw;
  `

  const HealthButton = styled.button`
    background-color: ${({ color }) => color};
    color: ${({ textColor }) => textColor};
    font-size: 16px;
    cursor: pointer;
  `

const HealthFind = () => {
  const [healthFindPage, setHealthFindPage] = useState("healthType")


  return (
    <>
      <TapWrapper>
        <HealthButton
          onClick = {() => setHealthFindPage("healthType")}
          textColor = {healthFindPage === "healthType" ? "#39f2ac" : "#7b7b7b"}
        >
          운동종류별
        </HealthButton>
        |
        <HealthButton
          onClick = {() => setHealthFindPage("healthPart")}
          textColor = {healthFindPage === "healthType" ? "#7b7b7b" : "#39f2ac"}
        >
          운동부위별
        </HealthButton>
      </TapWrapper>
      <div>
        {healthFindPage === "healthType" ? (
          <HealthFindType />
        ) : (
          <HealthFindPart />
        )}
      </div>
    </>
  )
};

export default HealthFind;