import styled from "styled-components";
import { useState } from "react";

const UpdateDeleteWrapper = styled.div`
  display: block;
`
const UpdateButton = styled.button`
  background-color: #EAEFF1;
`

const DelteButton = styled.button`
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

const ScheduleUpdateDelete = () => {
  const [hp, setHP] = useState("");

  const onClickRadioButton = (e) => {
    setHP(e.target.value)
  };

  return (
    <>
      <UpdateDeleteWrapper>
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
      <SearchBar
        placeholder="원래 있던 이름 받아서 띄워줄 곳"
      />
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
      <UpdateButton>
        수정
      </UpdateButton>
      <DelteButton>
        삭제
      </DelteButton>
      </UpdateDeleteWrapper>
    </>
  );
};

export default ScheduleUpdateDelete;