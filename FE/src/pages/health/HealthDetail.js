import styled from "styled-components";
import BackButton from "../../components/buttons/BackButton";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import BookMark from "../../components/buttons/BookMark";
import UnBookMark from "../../components/buttons/UnBookMark";
import { useState, useEffect } from "react";
import ThumbsUp from "../../components/buttons/ThumbsUp";
import ThumbsDown from "../../components/buttons/ThumbsDown";
import ThumbsUped from "../../components/buttons/ThumbsUped";
import ThumbsDowned from "../../components/buttons/ThumbsDowned";
import HealthCard from "../../components/cards/HealthCard";
import Exercising from "../../components/buttons/Exercising";
import UnExercising from "../../components/buttons/UnExercising";
import { getExerciseDetail, getExerciseItemReco, exerciseBookMark, exerciseDoing } from "../../api/HealthAPI";
import { client } from "../../api";

const BlockWrapper = styled.div`
  background-color: transparent;
  padding: 8px;
`

const HealthWrapper = styled.div`
  display: ${(props) => props.display};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
  padding: 20px;
  border: ${(props) => props.border};
  /* border-radius: 12px; */
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.backgroundColor};
  margin: auto;
  padding: 4px;
`

const NameWrapper = styled.div`
  width: 280px;
`

const ButtonWrapper = styled.div`
  width: ${(props) => props.width};
  justify-content: center;
  display: flex;
`

const ThumbsWrapper = styled.div`
  display: block;
  justify-content: center;
  padding: 0 2px 0 2px;
`

const ThumbsContentWrapper = styled.div`
  display: block;
  font-size: x-small;
  color: #808080;
`

const YoutubeRecomWrapper = styled.div`
  display: flex;
  height: 20px;
`

const YoutubeIconWrapper = styled.div`
  color: red;
  font-size: x-large;
`

const RecomThumbWrapper = styled.div`
  background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
`

const HealthDetail = ({
   width, 
   height, 
   border, 
   justifyContent, 
   backgroundColor, 
   borderRadius, 
   exerciseId
  }) => {
  const [exer, setExer] = useState({
    exerciseName: "",
    exerciseContent: "",
    aerobic: "",
    exerciseParts: [],
    exerciseCategory: "",
    bookmark: "",
    doing: "",
    like: "",
  });

  const [recoExer, setRecoExer] = useState({
    exerciseName: "",
    aerobic: "",
    exerciseParts: [],
    exerciseCategory: "",
    bookmark: "",
    doing: "",
    like: "",
  })

//   // 운동 상세 정보 조회
//   const getDetail = async () => {
//     await getExerciseDetail(1);
//   // if (response.status === 200) {
//   //   console.log(response)
//   // } else{
//   //   console.log(error)
//   // }}
//   setExer({...response.data})
//   console.log(response)
// };
//   useEffect(() => {
//     getDetail();
//   }, []);

  // 운동 상세 정보 조회
  const getDetail = async() => {
    await client
      .get(`/exercise/1`)
      .then((response) => {
        if (response.status === 200)
        setExer({...response.data})
        console.log(response.data)
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getDetail();
  }, []);

  // 현재 운동과 유사한 운동 추천 받기
  const getReco = async () => {
    await getExerciseItemReco(data);
  if (response.status === 200) {
    setRecoExer([...response.data])
  }};
  useEffect(() => {
    getReco();
  }, []);


  return (
    <>
      <Header leftNone={true} leftChildren={<BackButton />}/>
      <BlockWrapper>
        <HealthWrapper>
          <NameWrapper>
            {exer.exerciseName}
          </NameWrapper>
          <ButtonWrapper>
            {exer.doing === "Y" ? <Exercising/> : <UnExercising/>}
          </ButtonWrapper>
          <ButtonWrapper  width="60px">
            {exer.bookmark === "N" ? <BookMark/> : <UnBookMark/>}
          </ButtonWrapper>
        </HealthWrapper>
      </BlockWrapper>
      <BlockWrapper>
        <HealthWrapper>
          <NameWrapper>
            {exer.aerobic} | {exer.exerciseParts} | {exer.exerciseCategory}
          </NameWrapper>
          <ButtonWrapper width="80px">
            <ThumbsWrapper>
              {exer.like === "Y" ? <ThumbsUped/> : <ThumbsUp/>}
              <ThumbsContentWrapper>좋아요</ThumbsContentWrapper>
            </ThumbsWrapper>
            <ThumbsWrapper>
              {exer.like === "N" ? <ThumbsDowned/> : <ThumbsDown/>}
              <ThumbsContentWrapper>싫어요</ThumbsContentWrapper>
            </ThumbsWrapper>
          </ButtonWrapper>
        </HealthWrapper>
      </BlockWrapper>
      <BlockWrapper>
        <HealthWrapper height="100px">
          {exer.exerciseContent}
        </HealthWrapper>
        <BlockWrapper>
          <HealthWrapper height="120px" backgroundColor="#FFB6B6" borderRadius="none" display="block">
            <YoutubeRecomWrapper>
              <YoutubeIconWrapper>
                <i class="fa-brands fa-youtube"/>
              </YoutubeIconWrapper>
              'ㅇㅇㅇ' 유튜브 추천 영상
            </YoutubeRecomWrapper>
          </HealthWrapper>
        </BlockWrapper>
      </BlockWrapper>
      <BlockWrapper>
        <HealthWrapper backgroundColor="transparent" justifyContent={"start"}>
          <RecomThumbWrapper>
            <i className="fa-regular fa-thumbs-up"/>
          </RecomThumbWrapper>
          'ㅇㅇㅇ'와 유사한 운동 추천
        </HealthWrapper>
        <HealthWrapper backgroundColor="transparent" justifyContent="space-between">
          <HealthCard/><HealthCard/><HealthCard/>
        </HealthWrapper>
      </BlockWrapper>
      <Footer />
    </>
  );
};

export default HealthDetail;

HealthWrapper.defaultProps = {
  display: "flex",
  width: "400px",
  height: "56px",
  justifyContent: "space-between",
  // padding: "20px",
  border: "none",
  borderRadius: "12px",
  backgroundColor: "#fff",
}