import styled from "styled-components";
import { doneSchedule } from "../../api/schedule";
import ScheduleDone from "../buttons/ScheduleDone";
import Modal from "../modals/Modal";
import ModalCloseButton from "../buttons/ModalCloseButton";
import ScheduleUpdateDelete from "../modals/contents/ScheduleUpdateDelete";
import { useState, useEffect } from "react";
import { client } from "../../api";

const DailyListWrapper = styled.div`
  display: block;
`
const DailyItemWrapper = styled.div`
  display: flex;
`

const HpIconWrapper = styled.div`
  font-size: small;
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const ScheduleListWrapper = styled.button`
  background-color: transparent;
`

const DailyDetailCard = ({calendarComplete, calendarContent, calendarDate,
  calendarId, calendarTime, exerciseId, name, pillId, onToggleScheduleDone
}) => {
  // 시, 분 까지만 자르기
  const scheduleTime = calendarTime.toString().substr(0, 5);

  // 모달 설정
  const [isOpen, setIsOpen] = useState(false);

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
        modalContent={
          <ScheduleUpdateDelete
            calendarContent={calendarContent}
            name={name}
            exerciseId={exerciseId}
            pillId={pillId}
            calendarId={calendarId}
            calendarTime={calendarTime}
            calendarDate={calendarDate}
          />}
        closeButton={<ModalCloseButton onClick={closeModal} />}
      />
      <DailyListWrapper>
        <DailyItemWrapper>
          {scheduleTime} |
          <HpIconWrapper>
            {exerciseId === null ? <i className="fa-regular fa-capsules"/> : <i className="fa-solid fa-dumbbell"/>}
          </HpIconWrapper>
          <ScheduleListWrapper
            name={name}
            onClick={() => {
              openModal();
            }}>
            {name} |
          </ScheduleListWrapper>
          <HpIconWrapper>
            <ScheduleDone
              calendarComplete={calendarComplete}
              onClick={() => {
                onToggleScheduleDone(calendarId)
              }}
            />
          </HpIconWrapper>
        </DailyItemWrapper>
      </DailyListWrapper>
    </>
  )
};

export default DailyDetailCard;