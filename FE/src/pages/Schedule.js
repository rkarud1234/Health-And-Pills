import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import BackButton from "../components/buttons/BackButton";
import styled from "styled-components";
import DailyCard from "../components/cards/DailyCard";
import SchedulePlusButton from "../components/buttons/SchedulePlusButton";
import { useState, useEffect } from "react";
import Modal from "../components/modals/Modal";
import ModalCloseButton from "../components/buttons/ModalCloseButton";
import ScheduleCreate from "../components/modals/contents/ScheduleCreate";
import { getYoilInfo, getYoilDetail, doneSchedule } from "../api/schedule";
import DailyDetailCard from "../components/cards/DailyDetailCard";
import ScheduleDone from "../components/buttons/ScheduleDone";
import PillScheduleCreate from "../components/modals/contents/PillScheduleCreate";

const BackWrapper = styled.div`
  background-color: #fff;
  background-size: cover;
  margin: auto;
`;

const WeeklyWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 32px;
  justify-content: space-around;
  /* background-color: transparent; */
`;

const ButtonWrapper = styled.div`
  height: 60px;
  text-align: center;
`;

const WeekDayWrapper = styled.div`
  text-align: center;
`;

const Schedule = () => {
  // 모달 설정
  const [isOpen, setIsOpen] = useState(false);
  const [schedulePage, setSchedulePage] = useState("");
  const modalPage = {
    scheduleCreate: <ScheduleCreate />,
    pillScheduleCreate: <PillScheduleCreate />,
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // 00년 0월 0주차 설정
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  });
  const yearTwo = date.year;
  const yearLastTwo = yearTwo.toString().slice(-2);
  const weekly = ["일", "월", "화", "수", "목", "금", "토"];
  const monthFirstDay = new Date(date.year, date.month - 1 , 1).getDay();
  console.log(new Date(date.year, date.month - 1 , 1))
  console.log(date.date)
  console.log(monthFirstDay)
  const nthWeek = parseInt(((date.date + monthFirstDay - 1) / 7)) + 1;

  // 오늘의 요일 설정
  const [yoil, setYoil] = useState(date.day);

  // 다른 요일로 바꾸기
  const onHandleYoil = async (calendarDate) => {
    setYoil(calendarDate);
  };

  // 각 요일에 운, 영 개수 집어넣기
  const [list, setList] = useState([]);

  // 일정이 존재하지 않을 때 카드 개수 모자라는거 처리
  const getInfo = async () => {
    const response = await getYoilInfo();
    const array = new Array(7);
    for (let data of response.data) {
      array[data.calendarDate] = data;
    }
    for (let i = 0; i < 7; i++) {
      if (!array[i]) {
        array[i] = { calendarDate: i, pillCount: 0, exerciseCount: 0 };
      }
    }
    setList([...array]);
  };

  // 요일별 상세 일정 불러오기 (디폴트는 오늘 요일)
  const getDetail = async () => {
    const response = await getYoilDetail(yoil);
    setDetail([...response.data]);
  };

  // 요일별 상세 일정 변수 초기화
  const [detail, setDetail] = useState([]);
  // console.log(detail)

  // 일정 완료 체크할때 리렌더링용
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    getInfo();
  }, [flag]);
  useEffect(() => {
    getDetail();
  }, [yoil, flag]);

  // 일정 완료 체크 or 해제
  const onToggleScheduleDone = async (calendarId) => {
    const response = await doneSchedule(calendarId);
    if (response.status === 200) {
      setFlag((prevState) => {
        return { ...prevState, flag: !flag };
      });
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        closeButton={<ModalCloseButton onClick={closeModal} />}
        modalContent={
          isOpen ? (
            <ScheduleCreate
              yoil={yoil}
              closeModal={closeModal}
              flag={flag}
              setFlag={setFlag}
            />
          ) : (
            <></>
          )
        }
        // modalContent={modalPage[schedulePage]}
        // closeButton={<ModalCloseButton onClick={closeModal} />}
        // yoil={yoil}
      />
      <Header leftNone={false} centerChildren={""} />
      <BackWrapper>
        <div
          style={{
            textAlign: "center",
            padding: "12px 0 24px 0",
            fontWeight: "600",
          }}
        >
          {yearLastTwo}년 {date.month}월 {nthWeek}주차
        </div>
        <WeeklyWrapper>
          {list.map((item, idx) => (
            <DailyCard
              {...item}
              key={idx}
              {...weekly}
              onHandleYoil={onHandleYoil}
              yoil={yoil}
            />
          ))}
        </WeeklyWrapper>
        <ButtonWrapper>
          <SchedulePlusButton
            onClick={() => {
              openModal();
              setSchedulePage("scheduleCreate");
            }}
          />
        </ButtonWrapper>
        {/* <ButtonWrapper
            onClick={() => {
              openModal();
              setSchedulePage("pillScheduleCreate");
            }}
          >
            <SchedulePlusButton/>
          </ButtonWrapper> */}
        <div style={{ textAlign: "center" }}>
          {detail.length !== 0 ? (
            <div style={{ height: "460px", overflowY: "auto" }}>
              {detail.map((item, idx) => (
                <DailyDetailCard
                  {...item}
                  key={item.calendarId}
                  onToggleScheduleDone={onToggleScheduleDone}
                  flag={flag}
                  setFlag={setFlag}
                />
              ))}
            </div>
          ) : (
            <>등록된 일정이 없습니다</>
          )}
        </div>
      </BackWrapper>
      <Footer />
    </>
  );
};

export default Schedule;
