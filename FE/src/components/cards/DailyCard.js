import { useEffect, useState } from "react";
import styled from "styled-components";
import { getYoilInfo } from "../../api/schedule";
import { client } from "../../api";

  const DailyCardWrapper = styled.div`
    display: block;
    background-color: transparent;
    padding-left: 12px;
    padding-right: 12px;
  `
  
  const DayWrapper = styled.div`
    text-align: center;
    align-items: center;
    font-size: small;
  `

  const DailyButton = styled.button`
    display: block;
    width: 40px;
    height: 40px;
    font-size: large;
  `

  const HpSection = styled.div`
    display: flex;
    font-size: small;
    justify-content: space-between;
  `

  const HpIconWrapper = styled.div`
    font-size: small;
    background: linear-gradient(#537CFE, #6A53FE);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `

  const HpNumWrapper = styled.div`
    color: black;
    font-size: small;
  `
  
const DailyCard = ({calendarDate, pillCount, exerciseCount, onHandleYoil}) => {

  const weekly = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <>
      <DailyCardWrapper>
        <DailyButton onClick={() => onHandleYoil(calendarDate)}>
            {weekly[calendarDate]}
          <HpSection>
            <HpIconWrapper>
              <i className="fa-regular fa-capsules"/>
            </HpIconWrapper>
            <HpNumWrapper>
              {pillCount}
            </HpNumWrapper>
          </HpSection>
          <HpSection>
            <HpIconWrapper>
              <i className="fa-solid fa-dumbbell"/>
            </HpIconWrapper>
            <HpNumWrapper>
              {exerciseCount}
            </HpNumWrapper>
          </HpSection>
        </DailyButton>
      </DailyCardWrapper>   
    </>
  );
};

export default DailyCard;