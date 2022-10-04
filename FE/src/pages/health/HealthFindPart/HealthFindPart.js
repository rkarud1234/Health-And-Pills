import HealthListCard from "../../../components/cards/HealthListCard";
import { useEffect, useState, useCallback, useRef } from "react";
import { client } from "../../../api";
import styled from "styled-components";
// import { useInView } from "react-intersection-observer";
import React from "react";
import { Card } from "@mui/material";

const HealthButton = styled.button`
  /* background-color: ${({ color }) => color}; */
  background-color: transparent;
  color: ${({ textColor }) => textColor};
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  border: solid 2px;
  border-radius: 12px;
  margin: 8px;
  /* background: linear-gradient(#537CFE, #6A53FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
  font-weight: ${({ fontWeight }) => fontWeight};
`;

const TypeBox = styled.div`
  width: 500px;
  padding: 4px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow: auto;
  white-space: nowrap;
  scrollbar-width: none;
`;

const TapWrapper = styled.div`
  width: 100vw;
`;
const CardWrapper = styled.div`
  background-color: #f5f5f5;
  margin-left: auto;
`;

const HealthFindPart = () => {
  const [part, setPart] = useState([]);
  const [partItems, setPartItems] = useState([]);

  const [partNum, setPartNum] = useState(1);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [ref, inView] = useInView();

  // 메뉴 횡스크롤
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);

    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };

  // 운동 부위별 반환
  const getExerPart = async () => {
    await client
      .get("/exercise/part-categories")
      .then((res) => {
        if (res.status === 200) setPart([...res.data]);
      })
      .catch((e) => e.res);
  };
  useEffect(() => {
    getExerPart();
  }, []);

  // 운동 부위별 클릭시 렌더링
  const onHandlePart = async (exercisePartCategoryId) => {
    setPartNum(exercisePartCategoryId);
  };

  // 운동 부위별 조회
  const getPartItems = useCallback(
    async (partNum) => {
      setLoading(true);
      await client
        .get(`/exercise/part?part=${partNum}&page=${page}`)
        .then((res) => {
          setPartItems([...res.data.content]);
        })
        .catch((e) => {
          console.log(e);
        });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    },
    [partNum, page],
  );
  useEffect(() => {
    getPartItems(1);
  }, []);

  // useEffect(() => {
  //   // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
  //   if (inView && !loading) {
  //     setPage((prevState) => prevState + 1);
  //   }
  // }, [inView, loading]);

  return (
    <>
      <CardWrapper>
        <TypeBox
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          ref={scrollRef}
        >
          {part.map((parts) => (
            <HealthButton
              {...parts}
              key={parts.exercisePartCategoryId}
              onClick={() => {
                onHandlePart(parts.exercisePartCategoryId);
                getPartItems(parts.exercisePartCategoryId);
              }}
              textColor={
                parts.exercisePartCategoryId === partNum ? "black" : "#7B7B7B"
              }
              fontWeight={
                parts.exercisePartCategoryId === partNum ? "bolder" : "normal"
              }
            >
              {/* {parts.exercisePartCategoryId} */}
              {parts.exercisePartCategoryName}
            </HealthButton>
          ))}
        </TypeBox>
        <div>
          {partItems.map((item, idx) => (
            <React.Fragment key={idx}>
              {partItems.length - 1 == idx ? (
                <>
                  {/* <div ref={ref}> */}
                  <HealthListCard {...item} key={idx}></HealthListCard>
                  {/* </div> */}
                </>
              ) : (
                <>
                  <HealthListCard {...item} key={idx}></HealthListCard>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </CardWrapper>
    </>
  );
};

export default HealthFindPart;
