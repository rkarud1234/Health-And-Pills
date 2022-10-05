import { useEffect, useState, useCallback, useRef } from "react";
import { client } from "../../../api";
import styled from "styled-components";
import React from "react";
import HealthFindList from "../HealthFindList";

const HealthButton = styled.button`
  background-color: transparent;
  color: ${({ textColor }) => textColor};
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  border: solid 2px;
  border-radius: 12px;
  margin: 8px;
  font-weight: ${({ fontWeight }) => fontWeight};
`;

const TypeBox = styled.div`
  /* width: 500px; */
  width: 100%;
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
  const [partNum, setPartNum] = useState(1);

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
              }}
              textColor={
                parts.exercisePartCategoryId === partNum ? "black" : "#7B7B7B"
              }
              fontWeight={
                parts.exercisePartCategoryId === partNum ? "bolder" : "normal"
              }
            >
              {parts.exercisePartCategoryName}
            </HealthButton>
          ))}
        </TypeBox>
        <HealthFindList
          typeNum={partNum}
          key={partNum + "part"}
          type={"part"}
        />
      </CardWrapper>
    </>
  );
};

export default HealthFindPart;
