import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updateUserinbody } from "../../api/users";
import GradationButton from "../../components/buttons/GradationButton";
import { editInbody } from "../../store/actions/user";

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
const getEditButtonStatus = (
  userProfileHeight,
  userProfileWeight,
  userProfileFat,
  userProfileSkeleton,
  userProfileWater,
  inBodyState
) =>
  parseInt(inBodyState.userProfileHeight) !== parseInt(userProfileHeight) ||
  parseInt(inBodyState.userProfileWeight) !== parseInt(userProfileWeight) ||
  parseInt(inBodyState.userProfileFat) !== parseInt(userProfileFat) ||
  parseInt(inBodyState.userProfileSkeleton) !== parseInt(userProfileSkeleton) ||
  parseInt(inBodyState.userProfileWater) !== parseInt(userProfileWater)
    ? true
    : false;

const Inbody = () => {
  const {
    userProfileHeight,
    userProfileWeight,
    userProfileWater,
    userProfileFat,
    userProfileSkeleton,
  } = useSelector((state) => state.user.data);

  const [inBodyState, setInbodyState] = useState({
    userProfileHeight,
    userProfileWeight,
    userProfileFat,
    userProfileSkeleton,
    userProfileWater,
  });
  const dispatch = useDispatch();
  const editButton = useRef(false);

  const onHandleInput = (e) => {
    setInbodyState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  editButton.current = useMemo(
    () =>
      getEditButtonStatus(
        userProfileHeight,
        userProfileWeight,
        userProfileFat,
        userProfileSkeleton,
        userProfileWater,
        inBodyState
      ),
    [
      userProfileHeight,
      userProfileWeight,
      userProfileFat,
      userProfileSkeleton,
      userProfileWater,
      inBodyState,
    ]
  );

  const onEditInbody = async () => {
    if (inBodyState.userProfileHeight.length === 0) {
      alert("Qn");
      return;
    }

    dispatch(editInbody(inBodyState));
    alert("수정되었습니다.");
  };
  return (
    <div>
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
        {editButton.current ? (
          <GradationButton
            type="button"
            text={"변경하기"}
            fontSize={"16px"}
            padding={"8px 16px"}
            height={"40px"}
            onClick={onEditInbody}
          />
        ) : (
          <GradationButton
            type="button"
            text={"변경하기"}
            from={"#bababa"}
            to={"#bababa"}
            fontSize={"16px"}
            padding={"8px 16px"}
            height={"40px"}
            cursor={"default"}
          />
        )}
      </InbodyWrapper>
    </div>
  );
};

export default Inbody;
