import styled, { css } from "styled-components";

const StyledGradationButton = styled.button`
  background: linear-gradient(
    to bottom,
    ${(props) => props.from},
    ${(props) => props.to}
  );
  min-width: 90px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 4px;
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  font-family: ${(props) => props.fontFamily};
  cursor: ${(props) => props.cursor};

  ${(props) =>
    props.status === "landing" &&
    css`
      position: fixed;
      bottom: 40px;
      right: 0;
      left: 0;
      margin: 0 auto;
      max-width: 380px;
      min-width: 240px;
    `}
`;
const GradationButton = ({
  text,
  onClick,
  type,
  from,
  to,
  width,
  height,
  color,
  padding,
  fontSize,
  position,
  fontFamily,
  cursor,
  status,
}) => {
  return (
    <StyledGradationButton
      from={from}
      to={to}
      color={color}
      padding={padding}
      width={width}
      height={height}
      fontSize={fontSize}
      position={position}
      onClick={onClick}
      fontFamily={fontFamily}
      cursor={cursor}
      status={status}
    >
      {text}
    </StyledGradationButton>
  );
};

GradationButton.defaultProps = {
  text: "확인",
  from: "#537CFE",
  to: "#6A53FE",
  color: "#fff",
  width: "100%",
  padding: "4px 20px 4px 20px",
  height: "fit-content",
  position: "static",
  fontFamily: "Nanum Gothic",
  cursor: "pointer",
};

export default GradationButton;
