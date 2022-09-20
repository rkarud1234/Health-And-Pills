import styled from "styled-components";
import { exerciseLike } from "../../api/HealthAPI";

const ThumbWrapper = styled.button`
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
`

const ThumbsDown = () => {

  const onHandleThumbsDown = async (e) => {
    const data = {
      exerciseId: 1,
      check: "N"
    };
    const response = await exerciseLike(data);
    if (response.status === 200) {
      console.log("싫어요 체크 됨")
    } else {console.log(response)}
  };

  return (
    <ThumbWrapper onClick={onHandleThumbsDown}>
      <i className="fa-regular fa-thumbs-down"></i>
    </ThumbWrapper>
  );
};

export default ThumbsDown;