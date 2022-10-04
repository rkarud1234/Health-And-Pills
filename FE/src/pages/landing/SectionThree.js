import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
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
      font-size: 18px;
      line-height: 28px;
    }
  }
`;

const ButtonWrapper = styled.div`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  padding: 0px 60px;
  @media screen and (max-width: 280px) {
    padding: 0px 30px;
  }
`;

const TypeButtonStyle = styled.button`
  padding: 8px 10px;
  border-radius: 5px;
  @media screen and (max-width: 280px) {
    font-size: 10px;
    padding: 8px;
  }
  &.active {
    border: 1px solid transparent;
    background: linear-gradient(to bottom, #537cfe, #6a53fe);
    color: white;
  }
  &.deactive {
    border: 1px solid #537cfe;
    background-color: transparent;
    color: black;
    cursor: pointer;
  }
  /* width: calc((100vw - 100px) / 3); */
`;
const TypeCardStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 240px;
  width: 80%;
  border: 1px solid #e1e1e1;
  border-radius: 16px;
  position: relative;
  margin-bottom: 100px;
  &.invisible {
    visibility: hidden;
  }
  @media screen and (max-width: 280px) {
    font-size: 14px;
  }
  &.active {
    animation: fadeInUp 1s;
  }
  &.hide {
    animation: fadeOut 1s forwards;
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 40px, 0);
    }
    100% {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translateZ(0);
    }
    100% {
      opacity: 0;
      transform: translate3d(0, 40px, 0);
    }
  }
`;

const TypeCardImage = styled.img`
  width: 200px;
  &.exercise {
    width: 120px;
    margin-bottom: 10px;
    @media screen and (max-width: 280px) {
      width: 100px;
    }
  }
  @media screen and (max-width: 280px) {
    width: 140px;
  }
`;
const Target = styled.div`
  height: 1px;
`;

const TypeCardContent = {
  pill: {
    text: "영양제 정보와\n다양한 사용자들의 리뷰를\n 확인해 보세요",
    img: "/landing/section3/clickPill.png",
  },
  exercise: {
    text: "내 라이프 스타일에\n맞는 운동을\n추천받아 보세요",
    img: "/landing/section3/exercise.png",
  },
  schedule: {
    text: "추천받은 영양제와\n운동에 대한 일정을\n간단하게 관리해 보세요",
    img: "/landing/section3/schedule.png",
  },
};
const TypeCard = ({ type, status }) => {
  return type !== "" ? (
    <TypeCardStyle className={status}>
      <div>
        <TypeCardImage
          className={type === "exercise" ? "exercise" : ""}
          src={process.env.PUBLIC_URL + `${TypeCardContent[type].img}`}
        />
      </div>
      <div>
        <h1>{TypeCardContent[type].text}</h1>
      </div>
    </TypeCardStyle>
  ) : (
    <TypeCardStyle className="invisible"></TypeCardStyle>
  );
};

const SectionThree = () => {
  const [type, setType] = useState("");
  const [status, setStatus] = useState("active");
  const [buttonType, setButtonType] = useState("pill");
  const target = useRef(null);
  // const [cardStatus, setStatus] = useState("");
  const onIntersect = async (entry, observer) => {
    if (entry[0].isIntersecting) {
      setStatus("active");
      setType("pill");
      observer.unobserve(entry[0].target);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    observer.observe(target.current);
    return () => observer.disconnect();
  }, []);
  const changeType = (nextType) => {
    if (type === nextType) {
      return;
    }
    setButtonType(nextType);
    setStatus("hide");
    setTimeout(() => {
      setType(nextType);
    }, 1000);
    setTimeout(() => {
      setStatus("active");
    }, 1000);
  };
  return (
    <Section>
      <Wrapper>
        <h1>HP는 어떻게 구성되어 있을까요?</h1>
        <ButtonWrapper>
          <TypeButtonStyle
            className={buttonType === "pill" ? "active" : "deactive"}
            onClick={() => changeType("pill")}
          >
            영양제
          </TypeButtonStyle>
          <TypeButtonStyle
            className={buttonType === "exercise" ? "active" : "deactive"}
            onClick={() => changeType("exercise")}
          >
            운동
          </TypeButtonStyle>
          <TypeButtonStyle
            className={buttonType === "schedule" ? "active" : "deactive"}
            onClick={() => changeType("schedule")}
          >
            일정관리
          </TypeButtonStyle>
        </ButtonWrapper>
        <TypeCard type={type} status={status} />
        <Target ref={target}></Target>
      </Wrapper>
    </Section>
  );
};

export default SectionThree;
