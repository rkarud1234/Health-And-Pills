import { Link } from "react-router-dom";
import styled from "styled-components";

const Heartbeatloader = styled.div`
  position: absolute;
  width: 15vmin;
  height: 15vmin;
  z-index: 0;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const SvgDraw = styled.svg`
  top: 0px;
  left: 0px;
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scale(1.4);
  z-index: 3;
`;

const Path = styled.path`
  stroke: #fff6bf;
  stroke-width: 7;
  stroke-dasharray: 1000px;
  stroke-dashoffset: 1000px;
  animation: draw 1.5s infinite forwards normal linear;
  animation-delay: 0.1s;
  position: relative;
  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

const InnerCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgb(150 170 255);
  position: absolute;
  z-index: 1;
  margin: auto;
  top: 0;
  opacity: 0.9;
  animation: innerbeat 1.5s infinite linear forwards;
  @keyframes innerbeat {
    0% {
      transform: scale(1);
    }
    10% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
    60% {
      transform: scale(1.05);
    }
    75% {
      transform: scale(1.2);
    }
  }
`;

const OuterCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgb(150 170 255 / 54%);
  box-shadow: 0 0 40px 20px #fff;
  position: absolute;
  z-index: -1;
  opacity: 0.9;
  top: 0;
  left: 0;
  transform: scale(1.2);
  animation: outerbeat 1.5s infinite linear forwards;
  @keyframes outerbeat {
    0% {
      transform: scale(1.2);
    }
    10% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(1.3);
    }
    60% {
      transform: scale(1.25);
    }
    75% {
      transform: scale(1.3);
    }
  }
`;
const HeartBeat = () => {
  return (
    <>
      <Heartbeatloader>
        <SvgDraw
          width="100%"
          height="100%"
          viewBox="0 0 150 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M 0 200 l 40 0 l 5 -40 l 5 40 l 10 0 l 5 15 l 10 -140 l 10 220 l 5 -95 l 10 0 l 5 20 l 5 -20 l 30 0"
            fill="transparent"
            stroke-width="4"
            stroke="black"
          />
        </SvgDraw>
        <InnerCircle />
        <OuterCircle />
      </Heartbeatloader>
    </>
  );
};
const Loading = () => {
  return (
    <>
      <HeartBeat />
    </>
  );
};

export default Loading;
