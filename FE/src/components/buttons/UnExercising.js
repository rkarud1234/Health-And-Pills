import styled from "styled-components";

const ExerWrapper = styled.div`
  justify-content: flex-end;
  display: flex;
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
  cursor: pointer;
  margin: auto;
`

const UnExercising = ({ onClick }) => {

  return (
    <ExerWrapper onClick={() => onClick("Y")}>
      <i className="fa-regular fa-square-check"></i>
    </ExerWrapper>
  )
};

export default UnExercising;