const ScheduleDone = ({ calendarComplete, onClick, calendarId }) => {
  return (
    <>
      <div onClick={() => onClick()} style={{ fontSize: "20px" }}>
        {calendarComplete === "Y" ? (
          <i className="fa-regular fa-square-check" />
        ) : (
          <i className="fa-light fa-square" />
        )}
      </div>
    </>
  );
};

export default ScheduleDone;
