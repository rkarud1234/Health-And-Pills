import styled from "styled-components";

const ExerWrapper = styled.div`
  justify-content: flex-end;
  display: flex;
  background: linear-gradient(#537cfe, #6a53fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
  cursor: pointer;
  margin: auto;
`;

const UnExercising = ({ onClick }) => {
  return (
    <ExerWrapper onClick={() => onClick("Y")}>
      <i className="fa-regular fa-square-check"></i>
    </ExerWrapper>
  );
};

export default UnExercising;
