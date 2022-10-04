import styled from "styled-components";

const StepWrapper = styled.div`
  display: flex;
  justify-content: center;
  & div {
    width: 100%;
  }
  & ul {
    display: flex;
    justify-content: space-around;
  }
`;

const Step = ({ type }) => {
  return (
    <StepWrapper>
      <div>
        <ul>
          <li>
            <p>1</p>
          </li>
          <li>
            <p>2</p>
          </li>
          <li>
            <p>3</p>
          </li>
        </ul>
      </div>
    </StepWrapper>
  );
};

export default Step;
