import styled from "styled-components";
import { useState } from "react";
import { deleteSchedule, editSchedule } from "../../../api/schedule";
import Schedule from "../../../pages/Schedule";
import { client } from "../../../api";

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

const CommentInput = styled.textarea`
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

// 시간 입력 폼
const ScheduleTimeForm = styled.input`
  text-align: center;
  outline: none;
`

const ScheduleUpdateDelete = ({calendarContent, calendarTime,
  name, exerciseId, pillId, calendarDate, calendarId
}) => {

  const onClickDeleteSchedule = async (calendarId) => {
    const response = await deleteSchedule(calendarId);
    if (response.status === 200) {
      console.log("삭제됨")
    }
  }

  // 시간 자르기
  const slicedCalendarTime = calendarTime.toString().split(':', 2);

  const [content, setContent] = useState({
    content: calendarContent,
    hour: slicedCalendarTime[0],
    minute: slicedCalendarTime[1],
  });

  // 시간 입력 조건
  const onScheduleTimeInput = (e) => {
    if (e.target.name == "hour" || e.target.name == "minute") {
      let onlyNumber = e.target.value.replace(/[^0-9]/g, "");
      onlyNumber = Math.max(
        0,
        Math.min(e.target.name == "hour" ? 23 : 59, onlyNumber)
      );
      setContent({
        ...content,
        [e.target.name]: onlyNumber,
      });
      return;
    }
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    });
  };

  // 일정 시간 수정
  const onScheduleEdit = (calendarId) => {
    client
      .put(`/calendars/${calendarId}`, {
        calendarContent: content.content,
        calendarTime: (content.hour + ":" + content.minute)
      })
      .then((response) => response)
      .catch((error) => error.response);
  }

  // 일정 내용 수정
  const onHandleInput = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const weekly = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <>
      <UpdateDeleteWrapper>
      <div>{weekly[calendarDate]}: {name}</div>
      <CommentInput
        placeholder={calendarContent}
        type="string"
        value={content.content}
        name="content"
        onChange={onHandleInput}
      >
      </CommentInput>
      <div>
        <ScheduleTimeForm
          value={content.hour}
          placeholder={slicedCalendarTime[0]}
          name="hour"
          onChange={onScheduleTimeInput}
        />
        시
        <ScheduleTimeForm
          value={content.minute}
          placeholder={slicedCalendarTime[1]}
          name="minute"
          onChange={onScheduleTimeInput}
        />
        분
      </div>
      <UpdateButton onClick={() => onScheduleEdit(calendarId)}>
        수정
      </UpdateButton>
      <DelteButton onClick={() => onClickDeleteSchedule(calendarId)}>
        삭제
      </DelteButton>
      </UpdateDeleteWrapper>
    </>
  );
};

export default ScheduleUpdateDelete;