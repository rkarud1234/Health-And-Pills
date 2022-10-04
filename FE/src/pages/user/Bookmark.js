import React, { useState } from "react";
import styled from "styled-components";
import UserBookmark from "../../components/user/profile/UserBookmark";

const ButtonWrapper = styled.div`
  padding: 10px 20px;
`;
const StyledTypeButton = styled.button`
  padding: 8px;
  width: 50%;
  background-color: transparent;
  border-bottom: 3px solid transparent;
  &.active {
    border-bottom: 3px solid cornflowerblue;
  }
`;

const Bookmark = () => {
  const [type, setType] = useState("pill");

  const onHandleTypeChange = (type) => {
    setType(type);
  };
  return (
    <>
      <ButtonWrapper>
        <StyledTypeButton
          className={type === "pill" ? "active" : ""}
          onClick={() => onHandleTypeChange("pill")}
        >
          영양제
        </StyledTypeButton>
        <StyledTypeButton
          className={type === "exercise" ? "active" : ""}
          onClick={() => onHandleTypeChange("exercise")}
        >
          운동
        </StyledTypeButton>
      </ButtonWrapper>
      <UserBookmark type={type} key={type} />
    </>
  );
};

export default React.memo(Bookmark);
