import styled from "styled-components";

const ExplainCardStyle = styled.div`
  width: calc(50% - 24px);
  height: auto;
  border: 1px solid #e1e1e1;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  margin-bottom: 20px;
  & span:first-child {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const ExpainCard = () => {
  return (
    <ExplainCardStyle>
      <span>영양제 데이터</span>
      <span>79701개</span>
    </ExplainCardStyle>
  );
};

export default ExpainCard;
