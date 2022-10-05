import styled from "styled-components";

const ExerWrapper = styled.div`
  width: auto;
  display: flex;
  background: linear-gradient(#537cfe, #6a53fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
  cursor: pointer;
  margin: auto;
  font-size: 23px;
`;

const Excercising = ({ onClick }) => {
  return (
    <ExerWrapper onClick={() => onClick("N")}>
      <i className="fa-solid fa-square-check"></i>
    </ExerWrapper>
  );
};

export default Excercising;
