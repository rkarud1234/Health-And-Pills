import styled from "styled-components";
import { exerciseDoing } from "../../api/HealthAPI";

const ButtonWrapper = styled.div`
  width: 120px;
  justify-content: flex-end;
  display: flex;
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
  cursor: pointer;
`

const Excercising = () => {
  const onHandleExercising = async (e) => {
    const data = {
      exerciseId: 1,
      // exerciseId: state.exerciseId,
      check: "N"
    };
    const response = await exerciseDoing(data);
    if (response.status === 200) {
      console.log("운동안하기쳌")
    } else {console.log(response)}
  };

  return (
    <ButtonWrapper onClick={onHandleExercising}>
      <i className="fa-solid fa-square-check"></i>
    </ButtonWrapper>
  )
};

export default Excercising;