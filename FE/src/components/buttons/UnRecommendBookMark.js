import styled from "styled-components";

const MarkStyled = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: #39f2ac;
  background: linear-gradient(#537cfe, #6a53fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 27px;
`;

const RecommendBookMark = ({ onClick }) => {
  return (
    <MarkStyled
      onClick={(event) => {
        event.stopPropagation();
        onClick("N");
      }}
    >
      <i className="fa-solid fa-bookmark" />
    </MarkStyled>
  );
};

export default RecommendBookMark;
