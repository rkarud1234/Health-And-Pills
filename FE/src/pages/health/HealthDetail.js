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
import {
  exerciseLike,
  getExerciseDetail,
  getExerciseItemReco,
  exerciseBookMark,
  exerciseDoing,
} from "../../api/HealthAPI";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const BlockWrapper = styled.div`
  background-color: transparent;
  padding: 8px 0px;
  margin: 8px 0px;
`;
const ScrollBox = styled.div`
  ::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera 환경*/
  scrollbar-height: none; /* firefox 환경 */
  overflow-y: scroll;
  height: 88vh;
`;
const HealthWrapper = styled.div`
  display: ${(props) => props.display};
  width: ${(props) => props.width};
  margin: 16px 0px;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
  border: ${(props) => props.border};
  border-radius: 8px;
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.backgroundColor};
  cursor: ${(props) => props.cursor};
`;

const NameWrapper = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  width: ${(props) => props.width};
  justify-content: center;
  display: flex;
  text-align: center;
  align-items: center;
  margin-bottom: 8px;
`;
const CheckBoxWrapper = styled.div``;

const ThumbsWrapper = styled.div`
  display: block;
  justify-content: center;
  padding: 16px 16px;
  // border: 1px solid #e0e0e0;
  width: 110px;
`;

const ThumbsContentWrapper = styled.div`
  display: block;
  font-size: 16px;
  margin-top: 4px;
  color: #000;
`;

const YoutubeRecomWrapper = styled.div`
  display: flex;
  justify-content: center;
  line-height: 40px;
`;

const YoutubeIconWrapper = styled.div`
  color: red;
  font-size: x-large;
  margin-right: 8px;
`;

const RecomThumbWrapper = styled.div`
  background: linear-gradient(#537cfe, #6a53fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: large;
  padding: 8px 0px;
`;

const RecoItemBox = styled.div`
  ::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera 환경*/
  scrollbar-width: none; /* firefox 환경 */
  cursor: pointer;
  display: flex;
  overflow-x: scroll;
  padding: 0px 0px 24px;
`;
const ExerDiv = styled.div`
  margin-right: 4px;
  margin-bottom: 4px;
  font-size: 13px;
  box-shadow: rgb(202 209 213) 0px 0px 0px 1px inset;
  padding: 8px 10px;
  border-radius: 40px;
`;
const InfoDiv = styled.div`
  margin: 8px 0px 4px;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoContentDiv = styled.div`
  font-size: 14px;
  color: rgb(56, 62, 65);
  line-height: 20px;
`;

const ExplainDiv = styled.div`
  border-left: 3px solid transparent;
  border-image: linear-gradient(to right, #537cfe, #6a53fe);
  border-image-slice: 1;
  font-size: 16px;
  margin: 32px 0 8px 0;
  padding: 2px 0 3px 5px;
  font-weight: 800;
`;

const CountDiv = styled.div`
  background: linear-gradient(180deg, #537cfe 0%, #6a53fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  padding-right: 4px;
`;
const YoutubeButton = styled.div`
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

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
  const navigate = useNavigate();
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const [startPageX, setStartPageX] = useState();
  const [endPageX, setendPageX] = useState();
  const { state } = useLocation();
  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartPageX(e.pageX);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = (e) => {
    setendPageX(e.pageX);
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
    setExer({ ...response.data });
  };
  useEffect(() => {
    getDetail();
    getReco();
    document.getElementById("scroll-box").scrollTo(0, 0);
    document.getElementById("x-scroll-box").scrollTo(0, 0);
    setStartPageX(0);
  }, [exerciseId]);

  // 현재 운동과 유사한 운동 추천 받기
  const getReco = async () => {
    const response = await getExerciseItemReco(exerciseId);
    setRecoExer([...response.data]);
  };

  const onToggleThumbsUp = async (value) => {
    const data = {
      exerciseId: exerciseId,
      check: value,
    };
    const response = await exerciseLike(data);
    // state 값에 변화 줘서 리렌더링 하기
    setExer((prevState) => {
      return {
        ...prevState,
        like: value,
      };
    });
    if (response.status === 200) {
    } else {
    }
  };

  const onToggleBookMark = async (value) => {
    const data = {
      exerciseId: exerciseId,
      check: value,
    };
    const response = await exerciseBookMark(data);
    setExer((prevState) => {
      return {
        ...prevState,
        bookmark: value,
      };
    });
  };

  const onToggleDoing = async (value) => {
    const data = {
      exerciseId: exerciseId,
      check: value,
    };
    const response = await exerciseDoing(data);
    setExer((prevState) => {
      return {
        ...prevState,
        doing: value,
      };
    });
  };

  let searchQuery = "";
  if (exer.exerciseName) {
    searchQuery = exer.exerciseName.replaceAll(" ", "+") + " 배우기";
  }

  return (
    <>
      <Header
        leftNone={true}
        centerChildren={exer.exerciseName}
        leftChildren={
          <BackButton
            onClick={() => {
              if (state === null) {
                navigate(-1);
              } else {
                if (state.prevPath) {
                  navigate("/profiles", {
                    state: {
                      infoType: state.prevPath,
                      title: state.title,
                      type: state.type,
                    },
                  });
                }
                if (state.toHealthHome) {
                  navigate("/health");
                }
              }
            }}
          />
        }
      />
      <ScrollBox id="scroll-box">
        <div style={{ width: "100%", padding: "0px 16px" }}>
          <HealthWrapper
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <NameWrapper>{exer.exerciseName}</NameWrapper>
            <CheckBoxWrapper className="hi">
              <ButtonWrapper>
                <p
                  style={{ padding: "4px", minWidth: "52px", fontSize: "14px" }}
                >
                  운동중
                </p>
                {exer.doing === "Y" ? (
                  <Exercising onClick={onToggleDoing} />
                ) : (
                  <UnExercising onClick={onToggleDoing} />
                )}
              </ButtonWrapper>
              <ButtonWrapper>
                <p
                  style={{
                    padding: "0 4px",
                    // marginBottom: "30px",
                    minWidth: "52px",
                    fontSize: "14px",
                  }}
                >
                  북마크
                </p>

                {exer.bookmark === "N" ? (
                  <BookMark onClick={onToggleBookMark} />
                ) : (
                  <UnBookMark onClick={onToggleBookMark} />
                )}
              </ButtonWrapper>
            </CheckBoxWrapper>
          </HealthWrapper>
          <div style={{ fontSize: "13px", color: "#383E41" }}>
            '{exer.exerciseName}' 운동을
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid #CAD1D5",
                padding: "8px 0px 16px",
              }}
            >
              <CountDiv>{exer.doingCount}</CountDiv>
              명이 하고 있습니다.
            </div>
          </div>
          <ExplainDiv>무/유산소 운동 여부</ExplainDiv>
          <InfoContentDiv>{exer.aerobic}</InfoContentDiv>
          <ExplainDiv>운동 부위</ExplainDiv>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {exer.exerciseParts &&
              exer.exerciseParts.map((exer, idx) => {
                return (
                  <ExerDiv
                    style={{ fontSize: "13px", color: "#383E41" }}
                    key={idx}
                  >
                    {exer}
                  </ExerDiv>
                );
              })}
          </div>
          <ExplainDiv>운동 종류</ExplainDiv>
          <InfoContentDiv>{exer.exerciseCategory}</InfoContentDiv>
          <ExplainDiv>운동 설명</ExplainDiv>
          <InfoContentDiv>{exer.exerciseContent}</InfoContentDiv>

          <BlockWrapper>
            <div
              style={{
                textAlign: "center",
                borderTop: "1px solid #CAD1D5",
                padding: "16px 0px 8px",
              }}
            >
              '{exer.exerciseName}'에 대한 고객님의 의견을 체크해주세요!
            </div>
            <ButtonWrapper width="100%">
              <ThumbsWrapper>
                {exer.like === "Y" ? (
                  <ThumbsUped onClick={onToggleThumbsUp} />
                ) : (
                  <ThumbsUp onClick={onToggleThumbsUp} />
                )}
                <ThumbsContentWrapper>좋아요!</ThumbsContentWrapper>
              </ThumbsWrapper>
              <ThumbsWrapper>
                {exer.like === "N" ? (
                  <ThumbsDowned onClick={onToggleThumbsUp} />
                ) : (
                  <ThumbsDown onClick={onToggleThumbsUp} />
                )}
                <ThumbsContentWrapper>별로예요</ThumbsContentWrapper>
              </ThumbsWrapper>
            </ButtonWrapper>
          </BlockWrapper>
          <YoutubeButton>
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
          </YoutubeButton>
          <BlockWrapper>
            <div style={{ display: "flex", padding: "8px 0px" }}>
              <RecomThumbWrapper>
                <i className="fa-regular fa-thumbs-up fa-lg" />
              </RecomThumbWrapper>
              <div
                style={{ fontSize: "16px", color: "#383E41", padding: "8px" }}
              >
                '{exer.exerciseName}' 운동과 유사한 운동 추천
              </div>
            </div>
            <RecoItemBox
              id="x-scroll-box"
              ref={scrollRef}
              onMouseDown={onDragStart}
              onMouseMove={onDragMove}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
            >
              {recoExer.map((recoExers) => (
                <div
                  className="onclick-div"
                  style={{ position: "relative" }}
                  key={recoExers.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (startPageX === endPageX) {
                      navigate(`/health/detail/${recoExers.id}`, {
                        state: {
                          toHealthHome: true,
                        },
                      });
                    }
                  }}
                >
                  <HealthCard
                    {...recoExers}
                    key={recoExers.id}
                    exerciseName={recoExers.name}
                    exerciseId={recoExers.id}
                    exerciseParts={recoExers.parts}
                  />
                </div>
              ))}
            </RecoItemBox>
          </BlockWrapper>
        </div>
        <Footer />
      </ScrollBox>
    </>
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
};
