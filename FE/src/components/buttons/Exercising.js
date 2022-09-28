import styled from "styled-components";

const ButtonWrapper = styled.div`
  width: 120px;
  justify-content: flex-end;
  display: flex;
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
  cursor: pointer;
`

const Excercising = ({onClick}) => {

  return (
    <ButtonWrapper onClick={() => onClick("N")}>
      <i className="fa-solid fa-square-check"></i>
    </ButtonWrapper>
  )
};

export default Excercising;