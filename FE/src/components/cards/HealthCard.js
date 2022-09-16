import { useState } from "react";
import styled from "styled-components";
import BookMark from "../buttons/BookMark";
import UnBookMark from "../buttons/UnBookMark";


const StyledHealthCard = styled.div`
  border-radius: 12px;
  box-shadow: rgb(100 100 111 / 35%) 0px 7px 29px 0px;
  background-color: #fff;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding:  "6px 8px 6px 8px";
  cursor: pointer;
  /* background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
`

const StyledHealthNameWrapper = styled.div`
  display: inline-block;
  font-size: 1rem;
  padding: ${(props) => props.padding};
  font-weight: ${(props) => props.fontWeight};
`

const HealthInfoWrapper = styled.div`
  font-size: 0.5rem;
  padding: ${(props) => props.padding};
`

const BookMarkWrapper = styled.div`
  display: inline-block;
  background-color: ${({ color }) => color};
`

const HealthCard = ({ width, height, padding, fontWeight }) => {
  const [bookMark, setBookMark] = useState(false)

  return (
    <>
      <StyledHealthCard width={width} height={height}>

        <StyledHealthNameWrapper padding={padding} fontWeight={fontWeight}>
          운동 이름
          <BookMarkWrapper
            onClick = {() => setBookMark(!bookMark)}
            >
            <div>
              {bookMark === false ? (
                <BookMark/>
              ) : (
                <UnBookMark/>
              )}
            </div>
          </BookMarkWrapper>
        </StyledHealthNameWrapper>
        <HealthInfoWrapper>
          무산소/어쩌고
        </HealthInfoWrapper>
      </StyledHealthCard>
    </>
  );
};

export default HealthCard;

HealthCard.defaultProps = {
  width: "120px",
  height: "60px",
  padding: "6px 8px 6px 8px",
  fontWeight: "600",
}