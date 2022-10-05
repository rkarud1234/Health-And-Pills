import { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../../components/layouts/Footer";
import HealthFind from "./HealthFind";
import HealthRecommend from "./HealthRecommend";
import {
  getExerciseBest,
  getExerciseCustom,
  getExerciseUser,
} from "../../api/HealthAPI";
import Loading from "../../components/layouts/Loading";
import { useSelector, useDispatch } from "react-redux/";
import { profile } from "../../store/actions/user";
// const CardWrapper = styled.div`
//   margin: auto;
//   align-items: center;
// `

const Box = styled.div`
  ::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera 환경*/
  scrollbar-height: none; /* firefox 환경 */
  overflow-y: scroll;
  height: 92vh;
`;

const HealthButton = styled.button`
  color: ${({ textColor }) => textColor};
  font-size: 18px;
  cursor: pointer;
  background: ${({ backgroundColor }) => backgroundColor};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: ${({ fontWeight }) => fontWeight};
  padding: 8px;
`;

const Health = () => {
  const [healthPage, setHealthPage] = useState("healthRecommend");

  //베스트 추천 운동 받아오기
  const [bestExercises, setBestExercises] = useState(null);
  const [customExercises, setCustomExercises] = useState(null);
  const [userExercises, setUserExercises] = useState(null);
  useEffect(() => {
    getExerciseBest().then((res) => {
      setBestExercises([...res.data]);
    });
  }, []);
  useEffect(() => {
    getExerciseCustom().then((res) => {
      setCustomExercises([...res.data]);
    });
  }, []);
  useEffect(() => {
    getExerciseUser().then((res) => {
      setUserExercises([...res.data]);
    });
  }, []);
  const dispatch = useDispatch();

  //유저 성별/연령대 구하기
  useEffect(() => {
    dispatch(profile());
  }, []);
  const user = useSelector((state) => state.user.data);
  const today = new Date();
  let age = "";
  let ageGroup = "";
  let gender = "";
  if (user) {
    age = today.getFullYear() - user.userProfileBirthday.slice(0, 4) + 1;
  }
  if (age < 20) {
    ageGroup = "10대";
  } else if (age < 30) {
    ageGroup = "20대";
  } else if (age < 40) {
    ageGroup = "30대";
  } else if (age < 50) {
    ageGroup = "40대";
  } else if (age < 60) {
    ageGroup = "50대";
  } else if (age < 70) {
    ageGroup = "60대";
  } else if (age < 80) {
    ageGroup = "70대";
  }
  if (user) {
    if (user.userProfileGender === "male") {
      gender = "남성";
    } else {
      gender = "여성";
    }
  }
  const tabPage = {
    healthRecommend: (
      <HealthRecommend
        bestExercises={bestExercises}
        customExercises={customExercises}
        userExercises={userExercises}
        ageGroup={ageGroup}
        gender={gender}
        user={user.userProfileNickname}
      />
    ),
    healthFind: <HealthFind />,
  };
  return (
    <Box>
      {bestExercises && customExercises && userExercises ? (
        <div>
          <HealthButton
            onClick={() => setHealthPage("healthRecommend")}
            backgroundColor={
              healthPage === "healthRecommend"
                ? "linear-gradient(#537CFE, #6A53FE)"
                : "gray"
            }
            fontWeight={healthPage === "healthRecommend" ? "bolder" : "normal"}
          >
            추천 운동 보기
          </HealthButton>

          <HealthButton
            onClick={() => setHealthPage("healthFind")}
            backgroundColor={
              healthPage === "healthFind"
                ? "linear-gradient(#537CFE, #6A53FE)"
                : "gray"
            }
            fontWeight={healthPage === "healthFind" ? "bolder" : "normal"}
          >
            직접 운동 찾기
          </HealthButton>
          <div>{tabPage[healthPage]}</div>
          <Footer />
        </div>
      ) : (
        <Loading></Loading>
      )}
    </Box>
  );
};

export default Health;
