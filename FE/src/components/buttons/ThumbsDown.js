import styled from "styled-components";

const ThumbWrapper = styled.button`
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
`

const ThumbsDown = ({ onClick }) => {

  return (
    <ThumbWrapper onClick={() => onClick("N")}>
      <i className="fa-regular fa-thumbs-down fa-lg"></i>
    </ThumbWrapper>
  );
};

export default ThumbsDown;