import styled from "styled-components";
import imgUrl from "../../assets/pillImg.png"

const StyledPillCard = styled.div`
  border-radius: 10px;
  // border: 1px solid #e0e0e0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background-color: #fff;
  width: ${(props) => props.width};
  cursor: pointer;
`;

const StyledPillCardImgWrapper = styled.div`
  // border-bottom: 1px solid #ddd;
  
  // padding: ${(props) => props.padding};
  & img {
    width: 100%;
    height: 100px;
  }
`;

const StyledPillCardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #537cfe;
  font-size:14px;
  padding: ${(props) => props.padding};
  padding-bottom: 6px;
  & span:last-child {
    color: gray;
    font-size: 14px;
  }
  & span:last-child i {
    margin: 6px 3px 0 0;
    color: #537cfe;
    font-size: 12px;
  }
`;

const imgStyle = {
  borderRadius: '10px 10px 0 0'
}


const PillCard = ({ text, rating, width, height, padding, url }) => {
  let starRating = ''
  if (rating) {
    starRating = rating.toFixed(1)
  }
  return (
    <StyledPillCard width={width} height={height}>
      <StyledPillCardImgWrapper padding={padding}>
        {url ? <img src={url} style={imgStyle} /> : <img src={imgUrl} style={imgStyle} />}
      </StyledPillCardImgWrapper>
      <StyledPillCardContentWrapper padding={padding}>
        <span>{text && text.length > 6 ? text.slice(0, 6) + '...' : text}</span>
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
