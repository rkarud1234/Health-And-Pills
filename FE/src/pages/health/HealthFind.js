import { useState } from "react";
import styled from "styled-components";
import HealthFindType from "./HealthFindType";
import HealthFindPart from "./HealthFindPart/HealthFindPart";

const HealthButton = styled.button`
  color: gray;
  font-size: 16px;
  cursor: pointer;
  background: white;
  margin: 4px 4px 8px 4px;
  font-weight: ${({ fontWeight }) => fontWeight};
`;

const PageWrapper = styled.div`
  border-top: 1px solid gray;
`;

const HealthFind = () => {
  const [healthFindPage, setHealthFindPage] = useState("healthType");
  const tabPage = {
    healthType: <HealthFindType />,
    healthPart: <HealthFindPart />,
  };

  return (
    <>
      <HealthButton
        onClick={() => setHealthFindPage("healthType")}
        fontWeight={healthFindPage === "healthType" ? "bolder" : "normal"}
      >
        운동종류별
      </HealthButton>
      |
      <HealthButton
        onClick={() => setHealthFindPage("healthPart")}
        fontWeight={healthFindPage === "healthPart" ? "bolder" : "normal"}
      >
        운동부위별
      </HealthButton>
      <PageWrapper>{tabPage[healthFindPage]}</PageWrapper>
    </>
  );
};

export default HealthFind;
