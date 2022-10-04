import styled from "styled-components";

const ExerWrapper = styled.div`
width: auto;
  display: flex;
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
  cursor: pointer;
  margin: auto;
`

const Excercising = ({ onClick }) => {

  return (
    <ExerWrapper onClick={() => onClick("N")}>
      <i className="fa-solid fa-square-check"></i>
    </ExerWrapper>
  )
};

export default Excercising;