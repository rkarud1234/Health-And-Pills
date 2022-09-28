import styled from "styled-components";

const DailyCard = () => {
  const DailyCardWrapper = styled.div`
    display: block;
    background-color: transparent;
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

  return (
    <>
      <DailyCardWrapper>
        <DayWrapper>
          요일
        </DayWrapper>
        <DailyButton>
          <HpSection>
            <HpIconWrapper>
              <i className="fa-regular fa-capsules"/>
            </HpIconWrapper>
            <HpNumWrapper>
              2
            </HpNumWrapper>
          </HpSection>
          <HpSection>
            <HpIconWrapper>
              <i className="fa-solid fa-dumbbell"/>
            </HpIconWrapper>
            <HpNumWrapper>
              5
            </HpNumWrapper>
          </HpSection>
        </DailyButton>
      </DailyCardWrapper>   
    </>
  );
};

export default DailyCard;