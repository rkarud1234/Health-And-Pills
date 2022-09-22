import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { createProfile } from "../../../api/users";
import FirstInformation from "./FirstInformation";
import Introduce from "./Introduce";
import SecondInformation from "./SecondInformation";
import Step from "./Step";

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

  const onHandleSubmit = useCallback(() => {
    const data = {
      userProfileBirthday: requireInformationState.birth,
      userProfileGender: requireInformationState.gender,
      exercisePurposeId: requireInformationState.purposeOfExercise,
      exerciseTimes: requireInformationState.timesOfExercise,
    };
    createProfile(data);
    alert("감사합니다.");
    navigate("/");
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
      <Step />
      {renderPage()}
    </RequiredInformationWrapper>
  );
};

export default RequiredInformation;
