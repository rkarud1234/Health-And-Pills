import styled from "styled-components";

const MarkStyled = styled.div`
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: #39f2ac;
  background: linear-gradient(#537cfe, #6a53fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 27px;
`;

const BookMark = ({ onClick }) => {
  return (
    <MarkStyled
      onClick={(event) => {
        event.stopPropagation();
        onClick("Y");
      }}
    >
      <i className="fa-regular fa-bookmark" />
    </MarkStyled>
  );
};

export default BookMark;
