import { useState } from "react";
import styled from "styled-components";
import HealthFindBody from "../health/HealthFindPart/HealthFindBody";
import HealthFindSports from "../health/HealthFindPart/HealthFindSports";
import HealthFindGigu from "./HealthFindPart/HealthFindGigu";

const TapWrapper = styled.div`
  width: 100vw;
`

const HealthButton = styled.button`
background-color: ${({ color }) => color};
color: ${({ textColor }) => textColor};
font-size: 16px;
cursor: pointer;
`

const HealthFindType = () => {
  const [typePage, setTypePage] = useState("body")
  const findPage = {
    body: <HealthFindBody/>,
    gigu: <HealthFindGigu/>,
    sports: <HealthFindSports/>
  }


  return (
    <>
    <TapWrapper>
      <HealthButton
        onClick = {() => setTypePage("body")}
        textColor = {typePage === "body" ? "#39C18E" : "#7b7b7b"}
      >
        맨몸
      </HealthButton>
      |
      <HealthButton
        onClick = {() => setTypePage("gigu")}
        textColor = {typePage === "gigu" ? "#39C18E" : "#7b7b7b"}
      >
        기구
      </HealthButton>
      |
      <HealthButton
        onClick = {() => setTypePage("sports")}
        textColor = {typePage === "sports" ? "#39C18E" : "#7b7b7b"}
      >
        스포츠
      </HealthButton>
      <div>
        {findPage[typePage]}
      </div>
    </TapWrapper>
    </>
  )
}

export default HealthFindType;