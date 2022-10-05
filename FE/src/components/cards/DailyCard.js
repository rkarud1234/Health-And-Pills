import { useEffect, useState } from "react";
import styled from "styled-components";
import { getYoilInfo } from "../../api/schedule";
import { client } from "../../api";

  const DailyCardWrapper = styled.div`
    display: block;
    background-color: transparent;
    padding-left: 12px;
    padding-right: 12px;
    text-align: center;
  `

  const DailyButton = styled.button`
    display: block;
    width: 40px;
    height: 40px;
    font-size: large;
    background-color: white;
    border-radius: 4px;
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
  
  const DailyCard = ({calendarDate, pillCount, exerciseCount, onHandleYoil, yoil}) => {

  const weekly = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <>
      <DailyCardWrapper>
            {weekly[calendarDate]}
        <DailyButton
          onClick={() => onHandleYoil(calendarDate)} style={{fontSize: "small"}}
          // textColor = {}
          >
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