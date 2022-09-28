import styled from "styled-components";

const ThumbWrapper = styled.button`
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
`

const ThumbsUp = ({onClick}) => {
  return (
    <ThumbWrapper onClick={() => onClick("Y")}>
      <i className="fa-regular fa-thumbs-up"></i>
    </ThumbWrapper>
  );
};

export default ThumbsUp;