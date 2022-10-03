import styled, { css } from "styled-components";

const ReviewButtonStyle = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  ${(props) =>
    props.status === "edit" &&
    css`
      background: linear-gradient(to bottom, #537cfe, #6a53fe);
      color: white;
      margin-right: 8px;
    `};

  ${(props) =>
    (props.status === "cancle" || props.status === "delete") &&
    css`
      background-image: linear-gradient(#fff, #fff),
        linear-gradient(to right, #9798fa, #98b5f8);
      background-clip: content-box, border-box;
      color: #9798fa;
    `}
`;

const ReviewButton = ({
  text,
  onClick,
  status,
  width,
  height,
  borderRadius,
  padding,
  fontSize,
}) => {
  return (
    <ReviewButtonStyle
      type="button"
      onClick={onClick}
      status={status}
      width={width}
      height={height}
      borderRadius={borderRadius}
      padding={padding}
      fontSize={fontSize}
    >
      {text}
    </ReviewButtonStyle>
  );
};

export default ReviewButton;

ReviewButton.defaultProps = {
  width: "40px",
  height: "24px",
  borderRadius: "6px",
  padding: "1.4px",
  fontSize: "13px !important",
};
