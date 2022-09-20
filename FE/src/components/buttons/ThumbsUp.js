import styled from "styled-components";
import { exerciseLike } from "../../api/HealthAPI";

const ThumbWrapper = styled.button`
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
`

const ThumbsUp = () => {

  const onHandleThumbsUp = async (e) => {
    const data = {
      exerciseId: 1,
      check: "Y"
    };
    const response = await exerciseLike(data);
    if (response.status === 200) {
      console.log("좋아요 체크 됨")
    } else {console.log(response)}
  };

  return (
    <ThumbWrapper onClick={onHandleThumbsUp}>
      <i className="fa-regular fa-thumbs-up"></i>
    </ThumbWrapper>
  );
};

export default ThumbsUp;