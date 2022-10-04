import { useEffect, useRef, useState } from "react";
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
    @media screen and (max-width: 280px) {
      font-size: 16px;
      line-height: 28px;
    }
  }
`;

const ExplainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Target = styled.div`
  height: 1px;
`;
const text =
  "HP는 빅데이터 기반 영양제 운동 추천\n일정관리가 가능한 플랫폼입니다.";

const cardData = [
  { textOne: "영양제 데이터", textTwo: "79701", delay: 0.2 },
  { textOne: "누적 리뷰", textTwo: "18328", delay: 0.4 },
  { textOne: "운동 데이터", textTwo: "377", delay: 0.6 },
  { textOne: "나만의", textTwo: "일정관리", delay: 0.8 },
];
const SectionTwo = () => {
  const target = useRef(null);
  const [cardStatus, setStatus] = useState("");
  const onIntersect = async (entry, observer) => {
    if (entry[0].isIntersecting) {
      setStatus("active");
      observer.unobserve(entry[0].target);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    observer.observe(target.current);
    return () => observer.disconnect();
  }, []);
  return (
    <Section>
      <Wrapper>
        <h1>{text}</h1>
        <ExplainWrapper>
          {cardData.map((item, idx) => (
            <ExpainCard key={idx} {...item} status={cardStatus} />
          ))}
        </ExplainWrapper>
        <Target ref={target}></Target>
      </Wrapper>
    </Section>
  );
};

export default SectionTwo;
