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
  opacity: 0;
  & span:first-child {
    font-size: 20px;
    margin-bottom: 10px;
    @media screen and (max-width: 280px) {
      font-size: 14px;
      line-height: 28px;
    }
  }
  position: relative;
  &.active {
    animation: ${(props) => `fadeInUp .5s ${props.delay}s forwards`};
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 80px, 0);
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  & span.number {
    color: #666af6;
    font-weight: 700;
  }
`;

const ExpainCard = ({ delay, status, textOne, textTwo }) => {
  return (
    <ExplainCardStyle delay={delay} className={status}>
      <span>{textOne}</span>
      <p>
        <span className={isNaN(parseInt(textTwo)) ? "" : "number"}>
          {textTwo}
        </span>
        {isNaN(parseInt(textTwo)) ? "" : "개"}
      </p>
    </ExplainCardStyle>
  );
};

export default ExpainCard;
