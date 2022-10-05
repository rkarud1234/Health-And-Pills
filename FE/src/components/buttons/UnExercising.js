import styled from "styled-components";

const ExerWrapper = styled.div`
  justify-content: flex-end;
  display: flex;
  background: linear-gradient(#537cfe, #6a53fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: ;
  cursor: pointer;
  margin: auto;
  font-size: 23px;
`;

const UnExercising = ({ onClick }) => {
  return (
    <ExerWrapper
      onClick={(e) => {
        e.stopPropagation();
        onClick("Y");
      }}
    >
      <i className="fa-regular fa-square-check"></i>
    </ExerWrapper>
  );
};

export default UnExercising;
