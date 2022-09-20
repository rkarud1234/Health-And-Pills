import styled from "styled-components";
import { exerciseBookMark } from "../../api/HealthAPI";

const MarkStyled = styled.button`
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  background-color: transparent;
  color: #39f2ac;
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
`

const UnBookMark = () => {

  // 북마크 --> exerciseId 나중에 변수로 바꾸기
  const onHandleBookMark = async (e) => {
    const data = {
      exerciseId : 1,
      // exerciseId: state.exerciseId,
      check: "N"
    };
    const response = await exerciseBookMark(data);
    if (response.status === 200) {
      console.log("언북마크됐")
    } else {console.log(response)}
  };

  return (
    <MarkStyled onClick={onHandleBookMark}>
      <i className="fa-solid fa-bookmark"/>
    </MarkStyled>
  );
};

export default UnBookMark;