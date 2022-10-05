import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "../../../api";
import { postSchedule, searchExerSchedule } from "../../../api/schedule";

const CreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 380px;
  align-items: baseline;
  margin: 0 auto;
  margin-top: 40px;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 14px;
  font-size: 14px;
  align-items: center;
  & div {
    margin: 0 4px;
    padding: 6px;
    color: white;
    border-radius: 6px;
    background: linear-gradient(#537cfe, #6a53fe);
  }
  & input {
    margin: 0 5px;
  }
`;

const CreateButton = styled.button`
  background-color: #eaeff1;
  padding: 4px 12px;
  color: white;
  border-radius: 6px;
  background: linear-gradient(#537cfe, #6a53fe);
`;

const SearchBar = styled.input`
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  outline: none;
  padding: 0px 8px;
  &.active {
    border-bottom: transparent;
    border-radius: 8px 8px 0px 0px;
  }
  &.end {
    border-bottom: 1px solid #e1e1e1;
    border-radius: 8px;
  }
`;

const CommentInput = styled.textarea`
  border: 2px solid;
  border-radius: 8px;
  width: 100%;
  border: 1px solid #e1e1e1;
  outline: none;
  height: 100px;
  resize: none;
  padding: 8px;
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
  width: 80px;
`;

const SearchResultWrapper = styled.div`
  position: relative;
  top: -14px;
  font-size: 12px;
  width: 100%;
  padding: 0px 8px;
  &.first {
    padding-top: 10px;
    border-left: 1px solid #e1e1e1;
    border-right: 1px solid #e1e1e1;
  }
  &.end {
    border-bottom: 1px solid #e1e1e1;
    border-radius: 0 0 8px 8px;
    padding-bottom: 4px;
  }
  &.second {
    border-left: 1px solid #e1e1e1;
    border-right: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    border-radius: 0px 0px 8px 8px;
    margin-bottom: 10px;
  }
  &.down {
    padding-top: 10px;
  }

  & div {
    margin-bottom: 4px;
  }
`;
const TimeWrapper = styled.div`
  margin-top: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  text-align: end;
`;
const searchType = {
  1: "영양제",
  2: "운동",
};

const initialContent = {
  content: "",
  hour: "12",
  minute: "00",
  pillId: null,
  exerciseId: null,
};
const ScheduleCreate = ({ yoil, close }) => {
  const [hp, setHP] = useState("2");
  const onClickRadioButton = (e) => {
    setHP(e.target.value);
    setContent({ ...initialContent });
    setInputValue("");
    setResult([]);
    setUnResult([]);
    setChoiceValue(false);
    setIsHaveInputValue(false);
  };
  // 운동 검색
  const [word, setWord] = useState({
    search: "",
  });
  // 안하는 운동 검색 결과
  const [unResult, setUnResult] = useState([]);
  // 하는 운동 검색 결과
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState([]);
  const weekly = ["일", "월", "화", "수", "목", "금", "토"];

  // 자동완성 --> array안에 객체로 담아야됨 (iterable)

  // 검색어 입력
  const [inputValue, setInputValue] = useState("");
  // 검색어에 단어 존재유무
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  // 하는 운동 중에 검색어 일치
  const [droppDownList, setDroppDownList] = useState();
  // 하고 있지 않은 운동 중에 검색어 일치
  const [dropDownList, setDropDownList] = useState();
  // 클릭했을 때
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

  const [choiceValue, setChoiceValue] = useState(false);

  // 인풋 입력
  const [content, setContent] = useState({ ...initialContent });

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

  // 일정 등록
  const onSchedulePost = async (e) => {
    if (!choiceValue) {
      alert("이름 검색후 아이템을 클릭하여 선택해주세요");
      return;
    }
    const data = {
      exerciseId: content.exerciseId,
      pillId: content.pillId,
      calendarContent: content.content,
      calendarDate: yoil,
      calendarTime: content.hour + ":" + content.minute,
    };
    const response = await postSchedule(data);
    if (response.status === 200) {
      alert("일정 등록이 완료되었습니다.");
      close();
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    setContent({ ...initialContent });
    console.log("안녕?");
  }, []);

  // 일정 내용 입력
  const onHandleInput = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  // 운동 단어 입력 === updateChange(e)
  const onExerWordInput = (e) => {
    setWord({ ...word, [e.target.name]: e.target.value });
  };

  const onSearchExercise = async (value) => {
    const response = await client.get(`/exercise/calendar-list`, {
      params: {
        search: value,
      },
    });
    setResult([...response.data[0]]);
    setUnResult([...response.data[1]]);
    setSearch([...response.data]);
  };

  const onSearchPill = async (value) => {
    const response = await client.get(`/pills/calendar-list`, {
      params: {
        search: value,
      },
    });
    setResult([...response.data[0]]);
    setUnResult([...response.data[1]]);
    setSearch([...response.data]);
  };

  const changeInputValue = (event) => {
    setChoiceValue(false);
    setInputValue(event.target.value);
    if (event.target.value.length === 0) {
      setUnResult([]);
      setResult([]);
      setIsHaveInputValue(false);
      return;
    } else {
      {
        parseInt(hp) === 1
          ? onSearchPill(event.target.value)
          : onSearchExercise(event.target.value);
      }
    }
    setIsHaveInputValue(true);
  };

  const clickDropDownItem = (clickedItem) => {
    const value =
      parseInt(hp) === 1 ? clickedItem.pillName : clickedItem.exerciseName;
    const id = parseInt(hp) === 1 ? clickedItem.pillId : clickedItem.exerciseId;
    const key = parseInt(hp) === 1 ? "pillId" : "exerciseId";
    setInputValue(value);
    setIsHaveInputValue(false);
    setChoiceValue(true);
    setContent({ ...content, [key]: id });
  };

  const handleDropDownKey = (event) => {
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      onSearchExercise();
      if (
        event.key === "ArrowDown" &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === "ArrowUp" && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1);
      if (event.key === "Enter" && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
      }
    }
  };
  return (
    <>
      <CreateWrapper>
        <RadioWrapper>
          <div>{weekly[yoil]}</div>
          <input
            type="radio"
            value="1"
            checked={hp === "1"}
            onChange={onClickRadioButton}
          />
          <label>영양제</label>
          <input
            type="radio"
            value="2"
            checked={hp === "2"}
            onChange={onClickRadioButton}
          />
          <label>운동</label>
        </RadioWrapper>

        <SearchBar
          type="text"
          value={inputValue}
          onChange={changeInputValue}
          className={
            (result.length === 0 && unResult.length === 0) || choiceValue
              ? "active end"
              : "active"
          }
          // onKeyUp={handleDropDownKey}
        />
        {isHaveInputValue && result.length !== 0 ? (
          <SearchResultWrapper
            className={unResult.length !== 0 ? "first" : "first end"}
          >
            {result.map((item, idx) => {
              return (
                <>
                  <div
                    key={idx + "doing"}
                    onClick={() => clickDropDownItem(item)}
                    onMouseOver={() => setDropDownItemIndex(item.idx)}
                  >
                    {parseInt(hp) === 1 ? item.pillName : item.exerciseName}
                  </div>
                </>
              );
            })}
          </SearchResultWrapper>
        ) : (
          <></>
        )}
        {isHaveInputValue && unResult.length !== 0 ? (
          <SearchResultWrapper
            className={result.length !== 0 ? "second" : "second down"}
          >
            {unResult.map((item, idx) => {
              return (
                <div
                  key={idx + "notDoing"}
                  onClick={() => clickDropDownItem(item)}
                  onMouseOver={() => setDropDownItemIndex(item.idx)}
                >
                  {parseInt(hp) === 1 ? item.pillName : item.exerciseName}
                </div>
              );
            })}
          </SearchResultWrapper>
        ) : (
          <></>
        )}
        <CommentInput
          maxLength={130}
          placeholder="설명을 입력하세요"
          type="string"
          value={content.content}
          name="content"
          onChange={onHandleInput}
        ></CommentInput>
        <TimeWrapper>
          <ScheduleTimeForm
            value={content.hour}
            name="hour"
            onChange={onScheduleTimeInput}
          />
          시
          <ScheduleTimeForm
            value={content.minute}
            name="minute"
            onChange={onScheduleTimeInput}
          />
          분
        </TimeWrapper>
        <ButtonWrapper>
          <CreateButton onClick={() => onSchedulePost()}>확인</CreateButton>
        </ButtonWrapper>
      </CreateWrapper>
    </>
  );
};

export default ScheduleCreate;
