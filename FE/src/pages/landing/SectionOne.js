import styled, { css } from "styled-components";

export const Section = styled.section`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  position: relative;
`;
const GifImage = styled.img`
  width: 100px;
  height: 100px;
  position: absolute;

  ${(props) =>
    props.status === "logo" &&
    css`
      width: 50px;
      height: 40px;
      top: 10px;
      left: 10px;
    `}
  ${(props) =>
    props.status === "pill" &&
    css`
      top: 0px;
      right: 30px;
      @media screen and (max-width: 280px) {
        width: 80px;
        height: 80px;
      }
    `}
    ${(props) =>
    props.status === "dumbbell" &&
    css`
      bottom: 0px;
      left: 30px;
      @media screen and (max-width: 280px) {
        width: 80px;
        height: 80px;
      }
    `}
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
  & h1 {
    text-align: center;
    font-size: 40px;
    line-height: 50px;
    white-space: pre-wrap;
    font-family: "NanumSquareRound";
    @media screen and (max-width: 280px) {
      font-size: 24px;
      line-height: 28px;
    }
  }
`;

const text = "나를 위한\n맞춤형\n디지털 헬스케어";
const SectionOne = () => {
  return (
    <Section>
      <Wrapper>
        <GifImage
          className="logo"
          src={process.env.PUBLIC_URL + "/landing/section1/hpLogo.png"}
          status={"logo"}
        />
        <TitleWrapper>
          <GifImage
            src={process.env.PUBLIC_URL + "/landing/section1/pill.gif"}
            status={"pill"}
          />
          <GifImage
            src={process.env.PUBLIC_URL + "/landing/section1/dumbbell.gif"}
            status={"dumbbell"}
          />

          <h1>{text}</h1>
        </TitleWrapper>
      </Wrapper>
    </Section>
  );
};

export default SectionOne;
