import styled from "styled-components";
import ExpainCard from "../../components/explain/ExpainCard";
import { Section } from "./SectionOne";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & h1 {
    white-space: pre-wrap;
    line-height: 24px;
    font-size: 20px;
    text-align: center;
    margin-bottom: 30px;
  }
`;

const ExplainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const text =
  "HP는 빅데이터 기반 영양제 운동 추천\n일정관리가 가능한 플랫폼입니다.";
const SectionTwo = () => {
  return (
    <Section>
      <Wrapper>
        <h1>{text}</h1>
        <ExplainWrapper>
          <ExpainCard />
          <ExpainCard />
          <ExpainCard />
          <ExpainCard />
        </ExplainWrapper>
      </Wrapper>
    </Section>
  );
};

export default SectionTwo;
