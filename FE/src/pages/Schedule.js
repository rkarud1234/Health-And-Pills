import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import BackButton from "../components/buttons/BackButton";
import styled from "styled-components";
import DailyCard from "../components/cards/DailyCard";
import SchedulePlusButton from "../components/buttons/SchedulePlusButton";
import { useState } from "react";
import Modal from "../components/modals/Modal";
import ModalCloseButton from "../components/buttons/ModalCloseButton";
import ScheduleCreate from "../components/modals/contents/ScheduleCreate";
import ScheduleUpdateDelete from "../components/modals/contents/ScheduleUpdateDelete";
import { useEffect } from "react";

const BackWrapper = styled.div`
  background-color: #EAEFF1;
  background-size: cover;
  margin: auto;
`

const WeeklyWrapper = styled.div`
  display: flex;
  height: 100px;
  justify-content: space-around;
  /* background-color: transparent; */
`

const ButtonWrapper = styled.div`
  height: 120px;
  text-align: center;
`

const ScheduleListWrapper = styled.button`
  background-color: transparent;
`


const Schedule = () => {
  // 모달 설정
  const [isOpen, setIsOpen] = useState(false);
  const [schedulePage, setSchedulePage] = useState("");
  const modalPage = {
    scheduleCreate: <ScheduleCreate/>,
    scheduleUpdateDelete: <ScheduleUpdateDelete/>
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
  const yearTwo = date.year
  const yearLastTwo = yearTwo.toString().slice(-2);
  const weekly = ['일', '월', '화', '수', '목', '금', '토'];
  const weekDay = weekly[date.day]
  const monthFirstDay = new Date(date.year, (date.month) - 1, 1).getDay()
  const nthWeek = ((date.day + monthFirstDay - 1) % 7)

  return (
    <>
      <Modal
        isOpen={isOpen}
        modalContent={modalPage[schedulePage]}
        closeButton={<ModalCloseButton onClick={closeModal} />}
      />
      <Header leftNone={true} leftChildren={<BackButton />}/>
        <BackWrapper>
          <div style={{textAlign: "center", padding: "12px 0 24px 0"}}>
            {yearLastTwo}년 {date.month}월 {nthWeek}주차
          </div>
          <WeeklyWrapper>
            <DailyCard/>
            <DailyCard/>
            <DailyCard/>
            <DailyCard/>
            <DailyCard/>
            <DailyCard/>
            <DailyCard/>
          </WeeklyWrapper>
          <ButtonWrapper
            onClick={() => {
              openModal();
              setSchedulePage("scheduleCreate");
            }}
          >
            <SchedulePlusButton/>
          </ButtonWrapper>
          <div>
            <ScheduleListWrapper
              onClick={() => {
                openModal();
                setSchedulePage("scheduleUpdateDelete");
              }}
            >
              시간 아이콘 이름 완료여부쳌박
            </ScheduleListWrapper>
          </div>
        </BackWrapper>
      <Footer/>
    </>
  )
}

export default Schedule;