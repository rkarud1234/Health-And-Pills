import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import GradationButton from "../../components/buttons/GradationButton";

const InbodyWrapper = styled.div`
  padding: 80px 20px;
  text-align: center;
  & div {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    width: 90%;
    & div:first-child {
      width: 30%;
      justify-content: flex-start;
      padding: 8px 10px;
      font-size: 16px;
      align-items: center;
    }
    & div:last-child {
      width: 60%;
    }
  }
`;

const StyledInput = styled.input`
  border: 2px solid #1e1e1e;
  padding: 8px 10px;
  font-size: 16px;
  border-radius: 6px;
  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const inbodyList = [
  { title: "키", inbodyType: "userProfileHeight" },
  { title: "몸무게", inbodyType: "userProfileWeight" },
  { title: "골격근량", inbodyType: "userProfileFat" },
  { title: "체지방량", inbodyType: "userProfileSkeleton" },
  { title: "체수분량", inbodyType: "userProfileWater" },
];

const Inbody = () => {
  const userProfileHeight = useSelector(
    (state) => state.user.data.userProfileHeight
  );
  const userProfileWeight = useSelector(
    (state) => state.user.data.userProfileWeight
  );
  const userProfileFat = useSelector((state) => state.user.data.userProfileFat);
  const userProfileSkeleton = useSelector(
    (state) => state.user.data.userProfileSkeleton
  );
  const userProfileWater = useSelector(
    (state) => state.user.data.userProfileWater
  );
  const [inBodyState, setInbodyState] = useState({
    userProfileHeight,
    userProfileWeight,
    userProfileFat,
    userProfileSkeleton,
    userProfileWater,
  });

  const onHandleInput = (e) => {
    setInbodyState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onEditInbody = () => {
    if (inBodyState.userProfileHeight.length === 0) {
      alert("Qn");
      return;
    }
  };
  return (
    <InbodyWrapper>
      {inbodyList.map((item, idx) => (
        <div key={idx}>
          <div>{item.title}</div>
          <div>
            <StyledInput
              type="number"
              onChange={onHandleInput}
              name={item.inbodyType}
              value={inBodyState[item.inbodyType]}
            />
          </div>
        </div>
      ))}
      <GradationButton
        onClick={onEditInbody}
        padding={"8px 12px"}
        fontSize={"16px"}
        width={"80%"}
      />
    </InbodyWrapper>
  );
};

export default Inbody;
