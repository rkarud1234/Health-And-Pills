import styled from "styled-components";
import { useState } from "react";
import { deleteSchedule } from "../../../api/schedule";
import { client } from "../../../api";

const UpdateDeleteWrapper = styled.div`
  display: block;
  width: 100%;
`;
const UpdateButton = styled.button`
  background: #537cfe;
  border-radius: 8px;
  color: #fff;
  font-size: 15px;
  padding: 4px 6px;
  margin: 8px;
`;

const DelteButton = styled.button`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  // color: #fff;
  font-size: 15px;
  padding: 4px 6px;
  margin: 8px;
`;

const SearchBar = styled.input`
  border: 2px solid;
  border-radius: 8px;
  width: 80%;
  height: 30px;
`;

const CommentInput = styled.textarea`
  border: 2px solid;
  border-radius: 8px;
  width: 80%;
  height: 120px;
  resize: none;
  outline: none;
`;

const DailyWrapper = styled.button`
  border: none;
  border-radius: 4px;
  background-color: #eaeff1;
`;

// 시간 입력 폼
const ScheduleTimeForm = styled.input`
  text-align: center;
  outline: none;
`;

const ScheduleUpdateDelete = ({
  calendarContent,
  calendarTime,
  name,
  calendarDate,
  calendarId,
  closeModal,
  flag,
  setFlag,
}) => {
  const onClickDeleteSchedule = async (calendarId) => {
    const response = await deleteSchedule(calendarId);
    if (response.status === 200) {
    }
    closeModal();
    setFlag(!flag);
  };
  // 시간 자르기
  const slicedCalendarTime = calendarTime.toString().split(":", 2);

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
        calendarTime: content.hour + ":" + content.minute,
      })
      .then((response) => {
        response;
        setFlag(!flag);
        alert("일정이 수정됐습니다.")
        closeModal();
      })
      .catch((error) => {
        error;
        alert("같은 시간에 여러 일정을 등록할 수 없습니다.")
        setContent((prevState) => {
          return {
            ...prevState,
            hour: slicedCalendarTime[0],
            minute: slicedCalendarTime[1],
          }
        })
      });
  };

  // 일정 내용 수정
  const onHandleInput = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  return (
    <>
      <UpdateDeleteWrapper>
        <div
          style={{
            marginBottom: "10px",
          }}
        >
          {name}
        </div>
        <CommentInput
          style={{
            border: "1px solid #e1e1e1",
            width: "100%",
          }}
          placeholder={calendarContent}
          type="string"
          value={content.content}
          name="content"
          onChange={onHandleInput}
        ></CommentInput>
        <div>
          <ScheduleTimeForm
            style={{
              width: "40px",
              border: "1px solid #e1e1e1",
              padding: "8px",
              borderRadius: "8px",
              margin: "8px",
            }}
            value={content.hour}
            placeholder={slicedCalendarTime[0]}
            name="hour"
            onChange={onScheduleTimeInput}
          />
          시
          <ScheduleTimeForm
            style={{
              width: "40px",
              border: "1px solid #e1e1e1",
              padding: "8px",
              borderRadius: "8px",
              margin: "8px",
            }}
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
