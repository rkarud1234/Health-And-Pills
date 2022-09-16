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

const BackWrapper = styled.div`
  background-color: #EAEFF1;
  background-size: cover;
  margin: auto;
`

const WeeklyWrapper = styled.div`
  display: flex;
  height: 120px;
  justify-content: space-around;
  /* background-color: transparent; */
`

const ButtonWrapper = styled.div`
  align-items: center;
  /* height: 120px; */
`

const ScheduleListWrapper = styled.button`
  background-color: transparent;
`


const Schedule = () => {
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

  return (
    <>
      <Modal
        isOpen={isOpen}
        modalContent={modalPage[schedulePage]}
        closeButton={<ModalCloseButton onClick={closeModal} />}
      />
      <Header leftNone={true} leftChildren={<BackButton />}/>
        <BackWrapper>
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