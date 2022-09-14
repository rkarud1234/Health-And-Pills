import styled from "styled-components";

const StyledBackButton = styled.button`
  background-color: transparent;
`;

const BackButton = ({ onClick }) => {
  return (
    <StyledBackButton onClick={onClick}>
      <i className="fas fa-chevron-left"></i>
    </StyledBackButton>
  );
};

export default BackButton;
