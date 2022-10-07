import React, { useMemo, useRef, useState } from "react";
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
  { title: "키(cm)", inbodyType: "userProfileHeight" },
  { title: "몸무게(kg)", inbodyType: "userProfileWeight" },
  { title: "골격근량(kg)", inbodyType: "userProfileFat" },
  { title: "체지방량(kg)", inbodyType: "userProfileSkeleton" },
  { title: "체수분량(L)", inbodyType: "userProfileWater" },
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
const emptyZeroValueCheck = (value) => {
  if (value.length === 0 || parseInt(value) === 0) {
    return true;
  }
  return false;
};
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
  const inbodyInput = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
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

  const validInbody = () => {
    // 최대값 검사
    if (
      inBodyState.userProfileFat > 100 ||
      inBodyState.userProfileWater > 100 ||
      inBodyState.userProfileSkeleton > 100 ||
      inBodyState.userProfileHeight > 220 ||
      inBodyState.userProfileFat > 140
    ) {
      return false;
    }
    // 최소값 검사
    if (
      inBodyState.userProfileFat < 0 ||
      inBodyState.userProfileWater < 0 ||
      inBodyState.userProfileSkeleton < 0 ||
      inBodyState.userProfileHeight < 0 ||
      inBodyState.userProfileFat < 0
    ) {
      return false;
    }

    return true;
  };

  const onEditInbody = () => {
    for (let element of inbodyInput.current) {
      if (emptyZeroValueCheck(element.current.value)) {
        alert("해당 인바디 정보를 입력해주세요.");
        element.current.focus();
        return;
      }
    }
    if (validInbody() === false) {
      alert("정확한 인바디 정보를 입력해주세요.");
    } else {
      dispatch(editInbody(inBodyState));
      alert("수정되었습니다.");
    }
  };
  return (
    <div>
      <InbodyWrapper>
        {inbodyList.map((item, idx) => (
          <div key={idx}>
            <div>{item.title}</div>
            <div>
              <StyledInput
                ref={inbodyInput.current[idx]}
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
