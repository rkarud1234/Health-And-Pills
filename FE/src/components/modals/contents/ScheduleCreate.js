import styled from "styled-components";
import { useState } from "react";

const CreateWrapper = styled.div`
  display: block;
`

const CreateButton = styled.button`
  background-color: #EAEFF1;
`

const SearchBar = styled.input`
  border: 2px solid;
  border-radius: 8px;
  width: 80%;
  height: 30px;
`

const CommentInput = styled.input`
  border: 2px solid;
  border-radius: 8px;
  width: 80%;
  height: 80px;
`

const DailyWrapper = styled.button`
  border: none;
  border-radius: 4px;
  background-color: #eaeff1;
`

const ScheduleCreate = () => {
  const [hp, setHP] = useState("");

  const onClickRadioButton = (e) => {
    setHP(e.target.value)
  };

  return (
    <>
    <CreateWrapper>
      <input
        type="radio"
        value="1"
        checked={hp === "1"}
        onChange={onClickRadioButton}
      />
      <label>
        영양제
      </label>
      <input
        type="radio"
        value="2"
        checked={hp === "2"}
        onChange={onClickRadioButton}
      />
      <label>
        운동
      </label>
      <SearchBar/>
      <CommentInput
        placeholder="코멘트"
      >
      </CommentInput>
      <div>
        <DailyWrapper>월</DailyWrapper>
        <DailyWrapper>화</DailyWrapper>
        <DailyWrapper>수</DailyWrapper>
        <DailyWrapper>목</DailyWrapper>
        <DailyWrapper>금</DailyWrapper>
        <DailyWrapper>토</DailyWrapper>
        <DailyWrapper>일</DailyWrapper>
      </div>
      <CreateButton>
        확인
      </CreateButton>
    </CreateWrapper>
    </>
  );
};

export default ScheduleCreate;