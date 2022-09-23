import styled from "styled-components";
import BackButton from "../../components/buttons/BackButton";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import BookMark from "../../components/buttons/BookMark";
import UnBookMark from "../../components/buttons/UnBookMark";
import { useState, useEffect, useCallback } from "react";
import ThumbsUp from "../../components/buttons/ThumbsUp";
import ThumbsDown from "../../components/buttons/ThumbsDown";
import ThumbsUped from "../../components/buttons/ThumbsUped";
import ThumbsDowned from "../../components/buttons/ThumbsDowned";
import HealthCard from "../../components/cards/HealthCard";
import Exercising from "../../components/buttons/Exercising";
import UnExercising from "../../components/buttons/UnExercising";
import { exerciseLike, getExerciseDetail, getExerciseItemReco, exerciseBookMark, exerciseDoing } from "../../api/HealthAPI";
import { client } from "../../api";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  // const [recoExer, setRecoExer] = useState({
  //   exerciseName: "",
  //   aerobic: "",
  //   exerciseParts: [],
  //   exerciseCategory: "",
  //   bookmark: "",
  //   doing: "",
  //   like: "",
  // })
  
  const { exerciseId } = useParams();

  // 운동 상세 정보 조회
  const getDetail = async () => {
    const response = await getExerciseDetail(exerciseId);
  setExer({...response.data})
  console.log(response)
  };
  useEffect(() => {
    getDetail();
  }, [exer.bookmark, exer.like, exer.doing]);

  // // 운동 상세 정보 조회
  // const getDetail = async(exerciseId) => {
  //   await client
  //     .get(`/exercise/${exerciseId}`)
  //     .then((response) => {
  //       if (response.status === 200)
  //       setExer({...response.data})
  //     })
  //     .catch((error) => console.log(error));
  // }
  // useEffect(() => {
  //   getDetail();
  // }, [exer.bookmark, exer.like, exer.doing]);

  // // 현재 운동과 유사한 운동 추천 받기
  // const getReco = async () => {
  //   await getExerciseItemReco(data);
  // if (response.status === 200) {
  //   setRecoExer([...response.data])
  // }};
  // useEffect(() => {
  //   getReco();
  // }, []);

  const [params, setParams] = useState({
    key: 'AIzaSyC5XUXYoD-TVqapYPw-T4_0vo6nsdjbQYg',
    part: 'snippet',
    q: `필라테스`,
    maxResults: 6,
    type: 'video',
  });
  
  // const [videos, setVideos] = useState({});

  // const getYoutube = useEffect(() => {
  //   axios.get('https://www.googleapis.com/youtube/v3/search', {params})
  //   .then((response) => {
  //     if (response.status === 200)
  //     setVideos([...response.data.items])
  //     // setVideos(response.data.items)
  //     console.log(response.data.items)
  //     console.log(videos)
  //   })
  // }, [])

  const onToggleThumbsUp = async (value) => {
    console.log(value)
    const data = {
      exerciseId: exerciseId,
      check: value
    };
    const response = await exerciseLike(data);
    // state 값에 변화 줘서 리렌더링 하기
    setExer((prevState)=> {
      return {
        ...prevState, like : value
      }
    })
    if (response.status === 200) {
    } else {console.log(response)}
  };

  const onToggleBookMark = async (value) => {
    console.log(value)
    const data = {
      exerciseId: exerciseId,
      check: value
    };
    const response = await exerciseBookMark(data);
    setExer((prevState) => {
      return {
        ...prevState, bookmark: value
      }
    })
  };

  const onToggleDoing = async (value) => {
    console.log(value)
    const data = {
      exerciseId: exerciseId,
      check: value
    };
    const response = await exerciseDoing(data);
    setExer((prevState) => {
      return {
        ...prevState, doing: value
      }
    })
  };

  return (
    <>
      <Header leftNone={true} leftChildren={<BackButton />}/>
      <BlockWrapper>
        <HealthWrapper>
          <NameWrapper>
            {exer.exerciseName}
          </NameWrapper>
          <ButtonWrapper>
            {exer.doing === "Y" ? <Exercising onClick={onToggleDoing}/> : <UnExercising onClick={onToggleDoing}/>}
          </ButtonWrapper>
          <ButtonWrapper  width="60px">
            {exer.bookmark === "N" ? <BookMark onClick={onToggleBookMark}/> : <UnBookMark onClick={onToggleBookMark}/>}
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
              {exer.like === "Y" ? <ThumbsUped onClick={onToggleThumbsUp}/> : <ThumbsUp onClick={onToggleThumbsUp}/>}
              <ThumbsContentWrapper>좋아요</ThumbsContentWrapper>
            </ThumbsWrapper>
            <ThumbsWrapper>
              {exer.like === "N" ? <ThumbsDowned onClick={onToggleThumbsUp}/> : <ThumbsDown onClick={onToggleThumbsUp}/>}
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
                <i className="fa-brands fa-youtube"/>
              </YoutubeIconWrapper>
              {exer.exerciseName} 유튜브 추천 영상 <br/>
            </YoutubeRecomWrapper>
            {/* <iframe
            id="ytplayer"
            type="text/html"
            width="400"
            height="200"
            src="https://www.youtube.com/embed/M7lc1UVf-VE"
            frameborder="0"
            allowfullscreen="allowfullscreen"></iframe> */}
          </HealthWrapper>
        </BlockWrapper>
      </BlockWrapper>
      <BlockWrapper>
        <HealthWrapper backgroundColor="transparent" justifyContent={"start"}>
          <RecomThumbWrapper>
            <i className="fa-regular fa-thumbs-up"/>
          </RecomThumbWrapper>
          {exer.exerciseName}와 유사한 운동 추천
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