const ScheduleDone = ({calendarComplete, onClick, calendarId}) => {
  return (
    <>
      <div onClick={() => onClick()}>
        {calendarComplete === "Y" ? <i className="fa-regular fa-square-check"/> : <i className="fa-regular fa-square"/>}
      </div>
    </>
  )
  };

export default ScheduleDone;