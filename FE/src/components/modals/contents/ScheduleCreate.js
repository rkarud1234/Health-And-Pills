import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "../../../api";
import { postSchedule, searchExerSchedule } from "../../../api/schedule";

const CreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CreateButton = styled.button`
  background-color: #eaeff1;
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
  height: 80px;
  resize: none;
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
const ScheduleCreate = ({ yoil }) => {
  const [hp, setHP] = useState("2");
  const onClickRadioButton = (e) => {
    setHP(e.target.value);
    setContent({ ...initialContent });
    setInputValue("");
    setIsHaveInputValue(false);
  };
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

  // 운동 검색
  const [word, setWord] = useState({
    search: "",
  });

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

  // const showDropDownList = () => {
  //   if (inputValue === "") {
  //     setIsHaveInputValue(false);
  //     setDropDownList([]);
  //     setDroppDownList([]);
  //   } else {
  //     const choosenTextList = unResultArray.filter((textItem) =>
  //       textItem.includes(inputValue)
  //     );
  //     const chosenTextList = resultArray.filter((textItem) =>
  //       textItem.includes(inputValue)
  //     );
  //     setDropDownList(choosenTextList);
  //     setDroppDownList(chosenTextList);
  //   }
  // };

  const changeInputValue = (event) => {
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
          {weekly[yoil]}
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
          // onKeyUp={handleDropDownKey}
        />
        {isHaveInputValue && (
          <div>
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
          </div>
        )}
        {isHaveInputValue && (
          <div>
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
          </div>
        )}
        <CommentInput
          maxLength={130}
          placeholder="설명을 입력하세요"
          type="string"
          value={content.content}
          name="content"
          onChange={onHandleInput}
        ></CommentInput>
        <div>
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
        </div>
        <CreateButton onClick={() => onSchedulePost()}>확인</CreateButton>
      </CreateWrapper>
    </>
  );
};

export default ScheduleCreate;
