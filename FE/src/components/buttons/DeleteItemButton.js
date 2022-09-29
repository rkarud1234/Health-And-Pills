import styled from "styled-components";

const DeleteItemButtonStyled = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(to right, #9798fa, #98b5f8);
  background-clip: content-box, border-box;

  & span {
    background: linear-gradient(to right, #537cfe, #6a53fe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }
`;

const DeleteItemButton = ({
  onClick,
  width,
  height,
  border,
  borderRadius,
  padding,
  fontSize,
  text,
}) => {
  return (
    <DeleteItemButtonStyled
      onClick={onClick}
      width={width}
      height={height}
      border={border}
      borderRadius={borderRadius}
      padding={padding}
      fontSize={fontSize}
    >
      <span>{text}</span>
    </DeleteItemButtonStyled>
  );
};

export default DeleteItemButton;

DeleteItemButton.defaultProps = {
  width: "40px",
  height: "24px",
  borderRadius: "6px",
  padding: "1.4px",
  fontSize: "13px !important",
};
