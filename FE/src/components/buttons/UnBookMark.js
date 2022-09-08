import styled from "styled-components";

const MarkStyled = styled.button`
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  background-color: transparent;
  color: #39f2ac;
  position: absolute;
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const UnBookMark = () => {

  return (
    <MarkStyled>
      <i className="fa-solid fa-bookmark"/>
    </MarkStyled>
  );
};

export default UnBookMark;