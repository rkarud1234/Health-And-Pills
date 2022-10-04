import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { createProfile } from "../../../api/users";
import FirstInformation from "./FirstInformation";
import Introduce from "./Introduce";
import SecondInformation from "./SecondInformation";
import RequireStep from "./RequireStep";

const RequiredInformationWrapper = styled.div`
  padding: 100px 20px;
`;
const RequiredInformation = () => {
  const [requireInformationState, setRequireInformationState] = useState({
    gender: "",
    birth: "",
    purposeOfExercise: 1,
    timesOfExercise: 1,
  });
  const [typeState, setTypeState] = useState("intro");
  const navigate = useNavigate();
  const onHandleChangeType = useCallback((type) => {
    setTypeState(type);
  }, []);

  const onHandleRequireInformation = useCallback((information) => {
    setRequireInformationState((prevState) => {
      return { ...prevState, ...information };
    });
  }, []);
  const createUserInformation = async (data) => {
    const result = await createProfile(data);
    if (result.status === 200) {
      alert("감사합니다.");
      navigate("/");
    } else {
      alert("처리중 에러발생");
    }
  };

  const onHandleSubmit = useCallback(() => {
    const data = {
      userProfileBirthday: requireInformationState.birth,
      userProfileGender: requireInformationState.gender,
      exercisePurposeId: requireInformationState.purposeOfExercise,
      exerciseTimes: requireInformationState.timesOfExercise,
    };
    createUserInformation(data);
  }, [requireInformationState]);
  const renderPage = () => {
    switch (typeState) {
      case "intro":
        return <Introduce changeType={onHandleChangeType} />;
      case "first":
        return (
          <FirstInformation
            gender={requireInformationState.gender}
            birth={requireInformationState.birth}
            changeInformation={onHandleRequireInformation}
            changeType={onHandleChangeType}
          />
        );
      case "second":
        return (
          <SecondInformation
            purposeOfExercise={requireInformationState.purposeOfExercise}
            timesOfExercise={requireInformationState.timesOfExercise}
            changeInformation={onHandleRequireInformation}
            changeType={onHandleChangeType}
            submit={onHandleSubmit}
          />
        );
      default:
        <Introduce />;
    }
  };
  return (
    <RequiredInformationWrapper>
      <RequireStep type={typeState} />
      {renderPage()}
    </RequiredInformationWrapper>
  );
};

export default RequiredInformation;
