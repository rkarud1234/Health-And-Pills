import styled from "styled-components";

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
    >
      {text}
    </StyledGradationButton>
  );
};

GradationButton.defaultProps = {
  text: "테스트 버튼",
  from: "#537CFE",
  to: "#6A53FE",
  color: "#fff",
  width: "100%",
  padding: "4px 20px 4px 20px",
  height: "fit-content",
  position: "static",
};

export default GradationButton;
