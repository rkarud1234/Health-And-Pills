import React from 'react'
import styled from 'styled-components'

const StyledPillCard = styled.div`
  display:flex;
  background-color: #fff;
  cursor: pointer;
  border-bottom: 1px solid #CAD1D5;
`;
const GradientIcon = styled.i`
background: linear-gradient(180deg, #6A53FE 0%, #537CFE 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
`
const StyledPillCardImgWrapper = styled.div`
  padding: 16px;
  & img {
    width: 100px;
    height: 100px;
    padding: 16px;
  }
`;

const StyledPillCardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
  padding: ${(props) => props.padding};
`;

const CompanyDiv = styled.div`
font-size: 13px;
font-weight: bold;
background: linear-gradient(180deg, #537CFE 0%, #6A53FE 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
padding-top: 4px;
`

const NameDiv = styled.div`
font-size: 16px;
font-weight: bold;
margin: 16px 0px 8px;
`
const HorizPillCard = ({ url, width, height, padding, name, companyName, reviewAverage, reviewCount }) => {
  return (
    <StyledPillCard width={width} height={height}>
      <StyledPillCardImgWrapper padding={padding}>
        {url ? <img src={url} /> : <img src={process.env.PUBLIC_URL + "logo512.png"} />}
      </StyledPillCardImgWrapper>
      <StyledPillCardContentWrapper padding={padding}>
        <CompanyDiv>{companyName}</CompanyDiv>
        <NameDiv>{name}</NameDiv>
        <div>
          <GradientIcon className="fas fa-star"></GradientIcon>
          {reviewAverage}({reviewCount})
        </div>
      </StyledPillCardContentWrapper>
    </StyledPillCard>
  )
}

export default HorizPillCard
