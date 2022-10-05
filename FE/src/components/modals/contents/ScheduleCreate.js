import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "../../../api";
import { postSchedule, searchExerSchedule } from "../../../api/schedule";

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

const ScheduleCreate = ({yoil}) => {
  const [hp, setHP] = useState("1");

  const onClickRadioButton = (e) => {
    setHP(e.target.value)
  };

  // 인풋 입력
  const [content, setContent] = useState({
    content: "",
    hour: "12",
    minute: "00",
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

  // 일정 등록
  const onSchedulePost = async (e) => {
    const data = {
      exerciseId: "3",
      pillId: null,
      calendarContent: content.content,
      calendarDate: yoil,
      calendarTime: (content.hour + ":" + content.minute),
    };
    const response = await postSchedule(data);
    if (response.status === 200) {
      console.log("일정 등록 완료")
    } else {
      console.log(response)
    }
  }

  // 일정 내용 입력
  const onHandleInput = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value })
  };

  // 운동 검색
  const [word, setWord] = useState({
    search: "",
  })

  // 운동 단어 입력 === updateChange(e)
  const onExerWordInput = (e) => {
    setWord({...word, [e.target.name]: e.target.value})
  }  


  const onSearchExercise = async () => {
    const response = await client
      .get(`/exercise/calendar-list`, {
        params: {
          // search: word.search,
          search: inputValue,
        },
      })
      setResult([...response.data[0]])
      setUnResult([...response.data[1]])
      setSearch([...response.data])
  };


  // 안하는 운동 검색 결과
  const [unResult, setUnResult] = useState({});
  // 하는 운동 검색 결과
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState([]);
  // console.log("하는거", result)
  // console.log("안함", unResult)
  // console.log("전체목록", search)
  // unResult.map(({exerciseName, exerciseId}) => {
  //   console.log(exerciseId)
  //   console.log(exerciseName)
  // })


  const weekly = ['일', '월', '화', '수', '목', '금', '토'];

  // 자동완성 --> array안에 객체로 담아야됨 (iterable)

  const [inputValue, setInputValue] = useState('')
  const [isHaveInputValue, setIsHaveInputValue] = useState(false)
  const [dropDownList, setDropDownList] = useState(unResult)
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)

  const showDropDownList = () => {
    if (inputValue === '') {
      setIsHaveInputValue(false)
      setDropDownList([])
    } else {
      // const choosenTextList = unResult.filter(textItem =>
      //   textItem.includes(inputValue)
      // )
      // setDropDownList(choosenTextList)
    }
  }

  const changeInputValue = event => {
    setInputValue(event.target.value)
    setIsHaveInputValue(true)
  }

  const clickDropDownItem = clickedItem => {
    setInputValue(clickedItem)
    setIsHaveInputValue(false)
  }

  const handleDropDownKey = event => {
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (
        event.key === 'ArrowDown' &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1)
      }

      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1)
      if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex])
        setDropDownItemIndex(-1)
      }
    }
  }

  useEffect(showDropDownList, [inputValue])


  return (
    <>
    <CreateWrapper>
      {weekly[yoil]}
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
        type="text"
        // value={word.search}
        value={inputValue}
        // name="search"
        // onChange={onExerWordInput}
        onChange={changeInputValue}
        onKeyUp={handleDropDownKey}
      />
      {/* <CreateButton onClick={() => onSearchExercise()}>
        검색
      </CreateButton> */}
      {isHaveInputValue && (
        <div>
          {dropDownList.length === 0 && (
            <div>해당하는 단어가 없습니다</div>
          )}
          {dropDownList.map((dropDownItem, dropDownIndex) => {
            return (
              <div
                key={dropDownIndex}
                onClick={() => clickDropDownItem(dropDownItem)}
                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                className={
                  dropDownItemIndex === dropDownIndex ? 'selected' : ''
                }
              >
                {dropDownItem}
              </div>
            )
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
      >
      </CommentInput>
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
      <CreateButton onClick={() => onSchedulePost()}>
        확인
      </CreateButton>
    </CreateWrapper>
    </>
  );
};

export default ScheduleCreate;