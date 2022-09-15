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

const ScheduleListWrapper = styled.div`
  background-color: transparent;
`


const Schedule = () => {
  const [modalState, setModalState] = useState(false);

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <>
      <Modal
          isOpen={modalState}
          modalContent={<ScheduleCreate />}
          closeButton={<ModalCloseButton onClick={closeModal} />}
          close={closeModal}
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
          <ButtonWrapper onClick={openModal}>
              <SchedulePlusButton/>
          </ButtonWrapper>
          <ScheduleListWrapper>
            일정 목록
          </ScheduleListWrapper>
        </BackWrapper>
      <Footer/>
    </>
  )
}

export default Schedule;