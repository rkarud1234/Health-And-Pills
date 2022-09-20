import styled from "styled-components";
import { exerciseLike } from "../../api/HealthAPI";

const ThumbWrapper = styled.button`
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
`

const ThumbsUped = () => {
  
  const onHandleThumbsUped = async (e) => {
    const data = {
      exerciseId: 1,
      check: null
    };
    const response = await exerciseLike(data);
    if (response.status === 200) {
      console.log("좋아요 체크 해제됨")
    } else {console.log(response)}
  };

  return (
    <ThumbWrapper onClick={onHandleThumbsUped}>
      <i className="fa-solid fa-thumbs-up"></i>
    </ThumbWrapper>
  );
};

export default ThumbsUped;