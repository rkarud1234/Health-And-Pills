import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledBackButton = styled.button``;

const BackButton = () => {
  const navigate = useNavigate();
  const onHandleBack = () => {
    navigate(-1);
  };
  return (
    <StyledBackButton onClick={onHandleBack}>
      <i className="fas fa-chevron-left"></i>
    </StyledBackButton>
  );
};

export default BackButton;
