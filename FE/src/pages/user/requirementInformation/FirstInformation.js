import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const FirstInformationWrapper = styled.div`
  height: 60vh;
  margin-top: 50px;
  position: relative;
  animation: fadeIn 1s ease-in-out;
  @keyframes fadeIn {
    from {
      top: 100px;
      opacity: 0;
    }
    to {
      top: 0px;
      opacity: 1;
    }
  }
`;

const InformationImageWrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & img {
    width: 150px;
  }
  & span {
    margin-top: 16px;
    font-family: "NanumSquareRound";
  }
`;

const GenderWrapper = styled.div`
  padding: 0px 20px;
  margin-top: 14px;
  font-size: 18px;
  & div:first-child {
    align-items: center;
    margin-bottom: 20px;
    & label {
      font-family: "NanumSquareRound";
    }
  }
`;
const GenderButtonWrapper = styled.div`
  justify-content: space-around;
  display: flex;
`;
const GenderButton = styled.button`
  border: 1px solid #ffffff;
  box-shadow: 0px 1px 5px rgb(0 0 0 / 25%);
  border-radius: 10px;
  width: 92px;
  border-radius: 10px;
  height: 92px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  position: relative;
  &.male {
    background-color: #178bff;
    & i {
      color: #fff !important;
    }
    & span {
      color: #fff !important;
    }
  }
  &.female {
    background-color: #fc7cb4;
    & i {
      color: #fff !important;
    }
    & span {
      color: #fff !important;
    }
  }
  & i {
    font-size: 34px;
  }
  & i.fa-mars {
    color: #178bff;
    & + span {
      color: #178bff;
    }
  }
  & i.fa-venus {
    color: #fc7cb4;
    & + span {
      color: #fc7cb4;
    }
  }
  & span {
    margin-top: 8px;
    font-size: 14px;
    font-family: "NanumSquareRound";
  }
`;

const BirthWrapper = styled.div`
  padding: 0px 20px;
  font-size: 18px;
  & div:first-child {
    align-items: center;
    & label {
      font-family: "NanumSquareRound";
    }
  }
`;

const BirthInputWarpper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  height: 60px;
  & span {
    margin-left: 10px;
    font-family: "NanumSquareRound";
    font-size: 16px;
    color: red;
  }
`;

const BirthInput = styled.input`
  width: 100%;
  font-family: "NanumSquareRound";
  outline: none;
  padding: 8px 10px 4px 10px;
  font-size: 18px;
  border-bottom: 1px solid gray;
  margin: 10px 0px;
  &.success {
    border-bottom: 1px solid #6994f6;
  }
`;

export const PrevNextButtonWrapper = styled.div`
  padding: 0px 20px;
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  & button {
    padding: 8px 12px;
    width: 100px;
    font-size: 16px;
  }
  & button {
    background-color: transparent;
    border: 2px solid #b1b2ff;
    border-radius: 6px;
    color: #9091f1;
    &.active {
      border: 1px solid transparent;
      border-radius: 6px;
      background-color: #b1b2ff;
      color: #fff;
    }
  }
`;
const FirstInformation = ({ gender, birth, changeType, changeInformation }) => {
  const [birthState, setBirthState] = useState(birth);
  const [genderState, setGengerState] = useState(gender);
  const [birthValidation, setBirthValidation] = useState({
    message: "",
    validation: false,
  });

  useEffect(() => {
    birthVadationCheck(birthState);
  }, []);

  const parse = (str) => {
    if (!/^(\d){8}$/.test(str)) return "invalid";
    const y = str.substr(0, 4);
    const m = str.substr(4, 2) - 1;
    const d = str.substr(6, 2);
    if (d < 1 || d > 31) {
      return "invalid";
    } else if (m < 0 || m > 12) {
      return "invalid";
    } else if ((m === 3 || m === 5 || m === 8 || m === 10) && d === 31) {
      return "invalid";
    } else if (m === 1) {
      const lastDay = new Date(y, 2, 0).getDate();
      if (d > lastDay) {
        return "invalid";
      }
    }
    return new Date(y, m, d);
  };
  const onHandleBirth = (e) => {
    setBirthState((prevState) => {
      birthVadationCheck(e.target.value);
      return e.target.value;
    });
  };

  const onHandleGender = (e) => {
    setGengerState(e.currentTarget.value);
  };

  const birthVadationCheck = (birth) => {
    if (birth.length === 0) {
      setBirthValidation({
        message: "",
        validation: false,
      });
      return;
    }
    const inputBirth = parse(birth);
    if (inputBirth === "invalid") {
      setBirthValidation({
        message: "생년월일을 올바르게 입력하세요.",
        validation: false,
      });
      return;
    }
    const today = new Date();
    if (today.getFullYear() - inputBirth.getFullYear() > 100) {
      setBirthValidation({
        message: "정말인가요?",
        validation: false,
      });
      return;
    }
    if (inputBirth <= today) {
      setBirthValidation({
        message: "",
        validation: true,
      });
      return;
    } else {
      setBirthValidation({
        message: "미래에서 오셨군요?",
        validation: false,
      });
      return;
    }
  };

  const onHandleType = (type) => {
    if (type === "second") {
      if (birthValidation.validation && genderState !== "") {
        const information = {
          birth: birthState,
          gender: genderState,
        };
        changeInformation(information);
      } else {
        return;
      }
    }
    changeType(type);
  };
  return (
    <FirstInformationWrapper>
      <InformationImageWrapper>
        <img src={process.env.PUBLIC_URL + "/profileImages/information.png"} />
        <span>사용자정보를 입력해주세요.</span>
      </InformationImageWrapper>
      <BirthWrapper>
        <div>
          <label htmlFor="age">생년월일</label>
        </div>
        <BirthInputWarpper>
          <BirthInput
            placeholder="ex) 20000101"
            value={birthState}
            id="age"
            name="age"
            type={"text"}
            onChange={onHandleBirth}
            maxLength={8}
            className={birthValidation.validation ? "success" : ""}
          />
          {!birthValidation.validation && birthState.length > 0 ? (
            <span>{birthValidation.message}</span>
          ) : (
            <></>
          )}
        </BirthInputWarpper>
      </BirthWrapper>
      <GenderWrapper>
        <div>
          <label htmlFor="age">성별</label>
        </div>
        <GenderButtonWrapper>
          <GenderButton
            type="button"
            value="male"
            name="gender"
            onClick={onHandleGender}
            className={genderState === "male" ? "male" : ""}
          >
            <i className="fa-solid fa-mars"></i>
            <span>남성</span>
          </GenderButton>
          <GenderButton
            type="button"
            value="female"
            name="gender"
            onClick={onHandleGender}
            className={genderState === "female" ? "female" : ""}
          >
            <i className="fa-solid fa-venus"></i>
            <span>여성</span>
          </GenderButton>
        </GenderButtonWrapper>
      </GenderWrapper>
      <PrevNextButtonWrapper>
        <button type="button" onClick={() => onHandleType("intro")}>
          뒤로가기
        </button>
        <button
          className={
            birthValidation.validation && genderState !== "" ? "active" : ""
          }
          type="button"
          onClick={() => onHandleType("second")}
        >
          다음
        </button>
      </PrevNextButtonWrapper>
    </FirstInformationWrapper>
  );
};

export default FirstInformation;
