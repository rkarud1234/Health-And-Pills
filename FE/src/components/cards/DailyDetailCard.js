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
`;
const DailyItemWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-left: 12px;
`;

const HpIconWrapper = styled.div`
  background: linear-gradient(#537cfe, #6a53fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ScheduleListWrapper = styled.button`
  background-color: transparent;
`;

const DailyDetailCard = ({
  calendarComplete,
  calendarContent,
  calendarDate,
  calendarId,
  calendarTime,
  exerciseId,
  name,
  pillId,
  onToggleScheduleDone,
  flag,
  setFlag,
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

  let cardColor = "#fff";
  let cardFontColor = "#000";
  let cardIconColor = "#537cfe";

  if (calendarComplete === "Y") {
    cardColor = "#e0e0e0";
    cardFontColor = "#999999";
    cardIconColor = "#999999";
  }

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
            closeModal={closeModal}
            flag={flag}
            setFlag={setFlag}
          />
        }
        closeButton={<ModalCloseButton onClick={closeModal} />}
      />

      <DailyItemWrapper
        style={{
          width: "90%",
          margin: "12px auto",
          borderRadius: "8px",
          backgroundColor: cardColor,
          color: cardFontColor,
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
      >
        <div
          style={{
            margin: "10px 0",
            padding: "4px 6px",
            borderRadius: "6px",
            color: "#565656",
            // boxShadow:
            //   "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        >
          {scheduleTime}
        </div>
        <div
          style={{
            display: "flex",
            margin: "0 24px 0 12px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: cardIconColor,
            }}
          >
            {exerciseId === null ? (
              <i className="fa-regular fa-capsules" />
            ) : (
              <i className="fa-solid fa-dumbbell" />
            )}
          </div>
          <ScheduleListWrapper
            style={{
              color: cardFontColor,
            }}
            name={name}
            onClick={() => {
              openModal();
            }}
          >
            {name}
          </ScheduleListWrapper>
        </div>

        <HpIconWrapper style={{ marginRight: "12px", paddingTop: "11px" }}>
          <ScheduleDone
            calendarComplete={calendarComplete}
            onClick={() => {
              onToggleScheduleDone(calendarId);
            }}
          />
        </HpIconWrapper>
      </DailyItemWrapper>
    </>
  );
};

export default DailyDetailCard;
