import styled from "styled-components";

const ThumbWrapper = styled.button`
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
`

const ThumbsDowned = ({ onClick }) => {

  return (
    <ThumbWrapper onClick={() => onClick(null)}>
      <i className="fa-solid fa-thumbs-down fa-lg"></i>
    </ThumbWrapper>
  );
};

export default ThumbsDowned;