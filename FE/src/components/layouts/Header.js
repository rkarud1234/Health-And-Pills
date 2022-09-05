import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 20px;
  text-align: center;
  position: relative;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  height: 60px;
  line-height: 20px;
  & button {
    position: absolute;
    display: block;
  }
  & button:first-child {
    left: 20px;
    top: 20px;
  }
  & button:last-child {
    right: 20px;
    top: 20px;
  }
`;

const Header = ({
  leftChildren,
  leftNone,
  centerChildren,
  rightChildren,
  rightNone,
}) => {
  return (
    <StyledHeader>
      {leftNone && leftChildren ? leftChildren : <></>}
      <strong>{centerChildren}</strong>
      {rightNone && rightChildren ? rightChildren : <></>}
    </StyledHeader>
  );
};

export default Header;

Header.defaultProps = {
  centerChildren: <h1>HP</h1>,
};
