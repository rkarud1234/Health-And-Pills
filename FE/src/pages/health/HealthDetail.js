import styled from "styled-components";
import BackButton from "../../components/buttons/BackButton";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import BookMark from "../../components/buttons/BookMark";
import UnBookMark from "../../components/buttons/UnBookMark";
import { useState, useEffect } from "react";
import ThumbsUp from "../../components/buttons/ThumbsUp";
import ThumbsDown from "../../components/buttons/ThumbsDown";
import HealthCard from "../../components/cards/HealthCard";
import ExcercisingCheckBox from "../../components/buttons/ExcercisingCheckBox";
import { getExerciseDetail } from "../../api/HealthAPI";
import { getExerciseItemReco } from "../../api/HealthAPI";

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

const HealthDetail = ({ width, height, border, justifyContent, backgroundColor, borderRadius, display }) => {
  const [exer, setExer] = useState({
    exerciseName: "",
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
  // const [bookMark, setBookMark] = useState(false)

  // 운동 상세 정보 조회
  const getDetail = await getExerciseDetail(data);
  if (response.status === 200) {
    setExer([...response.data])
  };
  useEffect(() => {
    getDetail();
  }, []);

  // 현재 운동과 유사한 운동 추천 받기
  const getReco = await getExerciseItemReco(data);
  if (response.status === 200) {
    setRecoExer([...response.data])
  };
  useEffect(() => {
    getReco();
  }, []);


  return (
    <>
      <Header leftNone={true} leftChildren={<BackButton />}/>
      <BlockWrapper>
        <HealthWrapper width={width} height={height} border={border} justifyContent={justifyContent} backgroundColor={backgroundColor} borderRadius={borderRadius}>
          <NameWrapper>
            운동 이름
          </NameWrapper>
          <ExcercisingCheckBox></ExcercisingCheckBox>
          <ButtonWrapper onClick = {() => setBookMark(!bookMark)} width="40px">
              {bookMark === false ? (<BookMark/>) : (<UnBookMark/>)}
          </ButtonWrapper>
        </HealthWrapper>
      </BlockWrapper>
      <BlockWrapper>
        <HealthWrapper width={width} height={height} border={border} backgroundColor={backgroundColor} borderRadius={borderRadius}>
          <NameWrapper>
            운동 분류
          </NameWrapper>
          <ButtonWrapper width="80px">
            <ThumbsWrapper>
              <ThumbsUp/>
              <ThumbsContentWrapper>
                좋아요
              </ThumbsContentWrapper>
            </ThumbsWrapper>
            <ThumbsWrapper>
              <ThumbsDown/>
              <ThumbsContentWrapper>
                별로예요
              </ThumbsContentWrapper>
            </ThumbsWrapper>
          </ButtonWrapper>
        </HealthWrapper>
      </BlockWrapper>
      <BlockWrapper>
        <HealthWrapper width={width} height="100px" border={border} backgroundColor={backgroundColor} borderRadius={borderRadius}>
          운동 설명 들어갈 곳
        </HealthWrapper>
        <BlockWrapper>
          <HealthWrapper width={width} height="120px" border={border} backgroundColor="#FFB6B6" borderRadius="none" display="block">
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
        <HealthWrapper width={width} height={height} border={border} backgroundColor="transparent" borderRadius={borderRadius}
          justifyContent={"start"}
        >
          <RecomThumbWrapper>
            <i className="fa-regular fa-thumbs-up"/>
          </RecomThumbWrapper>
          'ㅇㅇㅇ'와 유사한 운동 추천
        </HealthWrapper>
        <HealthWrapper width={width} height={height} border={border} backgroundColor="transparent" justifyContent="space-between">
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