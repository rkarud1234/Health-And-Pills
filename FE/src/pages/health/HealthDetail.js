import styled from "styled-components";
import BackButton from "../../components/buttons/BackButton";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import BookMark from "../../components/buttons/BookMark";
import UnBookMark from "../../components/buttons/UnBookMark";
import { useState, useEffect, useRef } from "react";
import ThumbsUp from "../../components/buttons/ThumbsUp";
import ThumbsDown from "../../components/buttons/ThumbsDown";
import ThumbsUped from "../../components/buttons/ThumbsUped";
import ThumbsDowned from "../../components/buttons/ThumbsDowned";
import HealthCard from "../../components/cards/HealthCard";
import Exercising from "../../components/buttons/Exercising";
import UnExercising from "../../components/buttons/UnExercising";
import { exerciseLike, getExerciseDetail, getExerciseItemReco, exerciseBookMark, exerciseDoing } from "../../api/HealthAPI";
import { useParams, useNavigate } from "react-router-dom";

const BlockWrapper = styled.div`
  background-color: transparent;
  padding: 8px 0px;
  margin: 8px 0px;
`
const ScrollBox = styled.div`
::-webkit-scrollbar {
  display: none;
} /* Chrome, Safari, Opera 환경*/
scrollbar-height: none; /* firefox 환경 */
overflow-y: scroll;
height: 88vh;
`
const HealthWrapper = styled.div`
  display: ${(props) => props.display};
  width: ${(props) => props.width};
  margin: 16px 0px;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
  border: ${(props) => props.border};
  /* border-radius: 12px; */
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.backgroundColor};
  cursor: ${(props) => props.cursor};
`

const NameWrapper = styled.div`
font-size: 22px;
font-weight: bold;
`

const ButtonWrapper = styled.div`
  width: ${(props) => props.width};
  justify-content: center;
  display: flex;
  text-align: center;
  align-items: baseline;
`

const ThumbsWrapper = styled.div`
  display: block;
  justify-content: center;
  padding: 16px 16px;
`

const ThumbsContentWrapper = styled.div`
  display: block;
  font-size: x-small;
  color: #808080;
`

const YoutubeRecomWrapper = styled.div`
  display: flex;
  justify-content: center;
  line-height: 40px;
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
  padding: 8px 0px;
`

const RecoItemBox = styled.div`
::-webkit-scrollbar {
  display: none;
} /* Chrome, Safari, Opera 환경*/
scrollbar-width: none; /* firefox 환경 */
cursor: pointer;
display: flex;
overflow-x: scroll;
padding: 0px 0px 24px;
`
const ExerDiv = styled.div`
margin-right: 4px;
margin-bottom: 4px;
font-size: 13px;
box-shadow: rgb(202 209 213) 0px 0px 0px 1px inset;
padding: 8px 10px;
border-radius: 40px;
`
const InfoDiv = styled.div`
margin: 8px 0px 4px;
background-color: #D9D9D9;
display: flex;
flex-direction: column;
justify-content: space-between;
`
const ExplainDiv = styled.div`
display:flex;
background: linear-gradient(180deg, #537CFE 0%, #6A53FE 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
margin-bottom: 8px;
margin-top: 16px;
margin-bottom: 12px;
padding-top: 4px
`

const CountDiv = styled.div`
background: linear-gradient(180deg, #537CFE 0%, #6A53FE 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
padding-right: 4px;
`

const HealthDetail = ({
  width,
  height,
  border,
  justifyContent,
  backgroundColor,
  borderRadius,
}) => {

  // 아이템 횡스크롤
  const scrollRef = useRef(null);
  const navigate = useNavigate()
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const [startPageX, setStartPageX] = useState();
  const [endPageX, setendPageX] = useState();
  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartPageX(e.pageX)
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = (e) => {
    setendPageX(e.pageX)
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };

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
  const [recoExer, setRecoExer] = useState([]);


  const { exerciseId } = useParams();

  // 운동 상세 정보 조회
  const getDetail = async () => {
    const response = await getExerciseDetail(exerciseId);
    setExer({ ...response.data })
  };
  useEffect(() => {
    getDetail();
  }, [exer.bookmark, exer.like, exer.doing, exerciseId]);

  // 현재 운동과 유사한 운동 추천 받기
  const getReco = async () => {
    const response = await getExerciseItemReco(exerciseId);
    setRecoExer([...response.data])
  };
  useEffect(() => {
    getReco();
  }, [recoExer.id]);

  // const [params, setParams] = useState({
  //   key: 'AIzaSyC5XUXYoD-TVqapYPw-T4_0vo6nsdjbQYg',
  //   part: 'snippet',
  //   q: `필라테스`,
  //   maxResults: 6,
  //   type: 'video',
  // });

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
    setExer((prevState) => {
      return {
        ...prevState, like: value
      }
    })
    if (response.status === 200) {
    } else { console.log(response) }
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

  let searchQuery = ''
  if (exer.exerciseName) {
    searchQuery = exer.exerciseName.replaceAll(' ', '+') + ' 배우기'
  }

  return (
    <ScrollBox>
      <Header leftNone={true} leftChildren={<BackButton onClick={() => window.history.go(-1)} />} />
      <div style={{ width: '100%', padding: '0px 16px' }}>
        <HealthWrapper display={'flex'} justifyContent={'space-between'} width={'100%'}>
          <NameWrapper>
            {exer.exerciseName}
          </NameWrapper>
          <ButtonWrapper>
            {exer.doing === "Y" ?
              <ButtonWrapper>
                <Exercising onClick={onToggleDoing} />
                <p style={{ paddingLeft: '4px', minWidth: '52px' }}>운동중</p>
              </ButtonWrapper>
              : <ButtonWrapper>
                <UnExercising onClick={onToggleDoing} />
                <p style={{ paddingLeft: '4px', minWidth: '52px' }}>운동중</p>
              </ButtonWrapper>}
            <ButtonWrapper>
              {exer.bookmark === "N" ? <BookMark onClick={onToggleBookMark} /> : <UnBookMark onClick={onToggleBookMark} />}
            </ButtonWrapper>
          </ButtonWrapper>
        </HealthWrapper>
        <div style={{ fontSize: '13px', color: '#383E41', }}>
          '{exer.exerciseName}' 운동을
          <div style={{ display: 'flex', borderBottom: '1px solid #CAD1D5', padding: '8px 0px 16px' }}>
            <CountDiv>
              {exer.doingCount}
            </CountDiv>
            명이 하고 있습니다.
          </div>
        </div>
        <ExplainDiv>
          무/유산소 운동 여부
        </ExplainDiv>
        <div style={{ fontSize: '13px', color: '#383E41' }}>
          {exer.aerobic}
        </div>
        <ExplainDiv>
          운동 부위
        </ExplainDiv>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {exer.exerciseParts && exer.exerciseParts.map((exer, idx) => {
            return (
              <ExerDiv style={{ fontSize: '13px', color: '#383E41' }} key={idx}>{exer}</ExerDiv>
            )
          })}
        </div>
        <ExplainDiv>
          운동 종류
        </ExplainDiv>
        <div style={{ fontSize: '13px', color: '#383E41' }}>
          {exer.exerciseCategory}
        </div>
        <ExplainDiv>
          운동 설명
        </ExplainDiv>
        <InfoDiv>
          <div style={{ fontSize: '14px', color: '#383E41', padding: '12px 4px', lineHeight: '24px' }}>
            {exer.exerciseContent}
          </div>
        </InfoDiv>

        <BlockWrapper>
          <div style={{ textAlign: 'center', borderTop: '1px solid #CAD1D5', padding: '16px 0px 8px' }}>
            '{exer.exerciseName}'에 대한 고객님의 의견을 체크해주세요!
          </div>
          <ButtonWrapper width="100%">
            <ThumbsWrapper>
              {exer.like === "Y" ? <ThumbsUped onClick={onToggleThumbsUp} /> : <ThumbsUp onClick={onToggleThumbsUp} />}
              <ThumbsContentWrapper>효과가 있어요!</ThumbsContentWrapper>
            </ThumbsWrapper>
            <ThumbsWrapper>
              {exer.like === "N" ? <ThumbsDowned onClick={onToggleThumbsUp} /> : <ThumbsDown onClick={onToggleThumbsUp} />}
              <ThumbsContentWrapper>별로예요</ThumbsContentWrapper>
            </ThumbsWrapper>
          </ButtonWrapper>
        </BlockWrapper>
        <HealthWrapper
          backgroundColor="#FFB6B6"
          borderRadius="none"
          display="block"
          width="100%"
        >
          <YoutubeRecomWrapper>
            <YoutubeIconWrapper>
              <i className="fa-brands fa-youtube" />
            </YoutubeIconWrapper>
            <div>
              <a
                href={`https://www.youtube.com/results?search_query=${searchQuery}`}
                target="_blank"
                rel="noreferrer"
              >
                {exer.exerciseName} 유튜브 영상 검색하기
              </a>
            </div>
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
        <BlockWrapper>
          <div style={{ display: 'flex', padding: '8px 0px' }}>
            <RecomThumbWrapper>
              <i className="fa-regular fa-thumbs-up fa-lg" />
            </RecomThumbWrapper>
            <div style={{ fontSize: '16px', color: '#383E41', padding: '8px' }}>
              '{exer.exerciseName}' 운동과 유사한 운동 추천
            </div>
          </div>
          <RecoItemBox
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
          >
            {recoExer.map((recoExers) => (
              <HealthCard
                {...recoExers} key={recoExers.id}
                exerciseName={recoExers.name}
                exerciseId={recoExers.id}
                exerciseParts={recoExers.parts}
              />
            ))}
          </RecoItemBox>
        </BlockWrapper>
      </div>
      <Footer />
    </ScrollBox>
  );
};

export default HealthDetail;

HealthWrapper.defaultProps = {
  display: "flex",
  width: "400px",
  justifyContent: "space-between",
  // padding: "20px",
  border: "none",
  borderRadius: "12px",
  backgroundColor: "#fff",
}