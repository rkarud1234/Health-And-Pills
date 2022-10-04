import styled from "styled-components";

const PlusButtonWrapper = styled.button`
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: xx-large;
  background-color: transparent;
  /* width: 500px; */
  border-radius: 50%;
  cursor: pointer;
`

const SchedulePlusButton = () => {
  return (
    <>
      <PlusButtonWrapper>
        <i className="fa-solid fa-circle-plus"/>
      </PlusButtonWrapper>
    </>
  );
};

export default SchedulePlusButton;