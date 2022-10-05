import styled from "styled-components";

const ThumbWrapper = styled.button`
  background: linear-gradient(#537cfe, #6a53fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  // background-color: #fff;
  // color: #aeaeae;
  font-size: large;
`;

const ThumbsUp = ({ onClick }) => {
  return (
    <ThumbWrapper onClick={() => onClick("Y")}>
      <i className="fa-regular fa-thumbs-up fa-lg"></i>
    </ThumbWrapper>
  );
};

export default ThumbsUp;
