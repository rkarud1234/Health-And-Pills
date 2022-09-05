import styled from "styled-components";

const StyledPillCard = styled.div`
  border-radius: 16px;
  box-shadow: rgb(100 100 111 / 35%) 0px 7px 29px 0px;
  background-color: #fff;
  width: ${(props) => props.width};
  cursor: pointer;
`;

const StyledPillCardImgWrapper = styled.div`
  border-bottom: 1px solid #ddd;
  padding: ${(props) => props.padding};
  & img {
    width: 100%;
  }
`;

const StyledPillCardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #537cfe;
  padding: ${(props) => props.padding};
  & span:last-child {
    color: gray;
  }
  & span:last-child i {
    color: #537cfe;
  }
`;

const PillCard = ({ text, rating, width, height, padding }) => {
  return (
    <StyledPillCard width={width} height={height}>
      <StyledPillCardImgWrapper padding={padding}>
        <img src={process.env.PUBLIC_URL + "logo512.png"} />
      </StyledPillCardImgWrapper>
      <StyledPillCardContentWrapper padding={padding}>
        <span>{text}</span>
        <span>
          <i className="fas fa-star"></i>
          {rating}
        </span>
      </StyledPillCardContentWrapper>
    </StyledPillCard>
  );
};

export default PillCard;

PillCard.defaultProps = {
  width: "110px",
  height: "150px",
  padding: "4px 6px 4px 6px",
};
