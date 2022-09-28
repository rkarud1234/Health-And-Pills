import { useState } from "react";
import styled from "styled-components";
import BookMark from "../buttons/BookMark";
import UnBookMark from "../buttons/UnBookMark";
import { Link } from "react-router-dom";

const HealthCardWrapper = styled.div`
  background-color: transparent;
  padding: 4px;
`

const StyledHealthCard = styled.div`
  border-radius: 12px;
  box-shadow: rgb(100 100 111 / 35%) 0px 7px 29px 0px;
  background-color: #fff;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding:  "6px 8px 6px 8px";
  cursor: pointer;
  /* justify-content: center; */
  position: relative;
  /* background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
`

const StyledHealthNameWrapper = styled.div`
  display: flex;
  font-size: 1rem;
  padding: ${(props) => props.padding};
  font-weight: ${(props) => props.fontWeight};
  text-align: center;
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const HealthInfoWrapper = styled.div`
  font-size: 0.5rem;
  padding: ${(props) => props.padding};
`

const BookMarkWrapper = styled.div`
  background-color: ${({ color }) => color};
  position: absolute;
  top: -8px;
  right: 16px;
  width: 15px;
  height: 20px;

`

const HealthCard = ({
  width, height, padding, fontWeight,
  exerciseName, aerobic, exerciseParts, exerciseCategory, bookmark, exerciseId
}) => {
  const [bookMark, setBookMark] = useState(false)

  return (
    <>
      <HealthCardWrapper> 
        <StyledHealthCard width={width} height={height}>
            {/* <BookMarkWrapper onClick = {() => setBookMark(!bookMark)}>
                {bookMark === false ? (
                  <BookMark/>
                ) : (
                  <UnBookMark/>
                )}
            </BookMarkWrapper> */}
          <StyledHealthNameWrapper padding="4px" fontWeight={fontWeight}>
            <Link to={`detail/${exerciseId}`}>
            {exerciseId}
            {exerciseName}
            </Link>
          </StyledHealthNameWrapper>
          <HealthInfoWrapper>
            {aerobic} | {exerciseParts} | {bookmark}
          </HealthInfoWrapper>
        </StyledHealthCard>
      </HealthCardWrapper>
    </>
  );
};

export default HealthCard;

StyledHealthCard.defaultProps = {
  width: "120px",
  height: "60px",
  // padding: "6px 8px 6px 8px",
  fontWeight: "600",
}

// HealthCard.defaultProps = {
//   width: "120px",
//   height: "60px",
//   // padding: "6px 8px 6px 8px",
//   fontWeight: "600",
// }