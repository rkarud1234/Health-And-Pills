import styled from "styled-components";
import imgUrl from "../../assets/waitingimg.jpg"

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
    width: 98px;
    height: 98px;
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

const PillCard = ({ text, rating, width, height, padding, url }) => {
  let starRating = ''
  if (rating) {
    starRating = rating.toFixed(1)
  }
  return (
    <StyledPillCard width={width} height={height}>
      <StyledPillCardImgWrapper padding={padding}>
        {url ? <img src={url} /> : <img src={imgUrl} />}
      </StyledPillCardImgWrapper>
      <StyledPillCardContentWrapper padding={padding}>
        <span>{text && text.length > 5 ? text.slice(0, 5) + '...' : text}</span>
        <span>
          <i className="fas fa-star"></i>
          {rating && starRating}
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
