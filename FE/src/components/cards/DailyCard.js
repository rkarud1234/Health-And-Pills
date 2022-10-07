import styled from "styled-components";

const DailyCardWrapper = styled.div`
  display: block;
  background-color: transparent;
  text-align: center;
`;

const DailyButton = styled.button`
  display: block;
  font-size: large;
  background: ${({ bgColor }) => bgColor};
  border-radius: 4px;
`;

const HpSection = styled.div`
  display: flex;
  font-size: small;
  justify-content: space-between;
`;

const HpIconWrapper = styled.div`
  font-size: 12px;
  margin: 2px;
  background: ${({ bgColor }) => bgColor};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HpNumWrapper = styled.div`
  color: ${({ color }) => color};
  font-size: 12px;
  margin: 2px;
`;
const DayDiv = styled.div`
  font-size: 12px;
  margin: 4px;
`;

const DailyCard = ({
  calendarDate,
  pillCount,
  exerciseCount,
  onHandleYoil,
  yoil,
}) => {
  const weekly = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <>
      <DailyCardWrapper>
        <DayDiv>{weekly[calendarDate]}</DayDiv>
        <DailyButton
          onClick={() => onHandleYoil(calendarDate)}
          style={{
            fontSize: "small",
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
          bgColor={
            yoil === calendarDate
              ? "linear-gradient(180deg, #537CFE 0%, #6A53FE 100%)"
              : "#fff"
          }
        >
          <HpSection>
            <HpIconWrapper
              bgColor={
                yoil === calendarDate
                  ? "white"
                  : "linear-gradient(#537CFE, #6A53FE)"
              }
            >
              <i className="fa-regular fa-capsules" />
            </HpIconWrapper>
            <HpNumWrapper color={yoil === calendarDate ? "white" : "balck"}>
              {pillCount}
            </HpNumWrapper>
          </HpSection>
          <HpSection>
            <HpIconWrapper
              bgColor={
                yoil === calendarDate
                  ? "white"
                  : "linear-gradient(#537CFE, #6A53FE)"
              }
            >
              <i className="fa-solid fa-dumbbell" />
            </HpIconWrapper>
            <HpNumWrapper color={yoil === calendarDate ? "white" : "balck"}>
              {exerciseCount}
            </HpNumWrapper>
          </HpSection>
        </DailyButton>
      </DailyCardWrapper>
    </>
  );
};

export default DailyCard;
