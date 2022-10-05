import { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { client } from "../../api";
import React from "react";
import HealthFindList from "./HealthFindList";
const CardWrapper = styled.div`
  background-color: #f5f5f5;
  margin-left: auto;
`;

const HealthButton = styled.button`
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

const HealthFindType = ({ exerciseId }) => {
  const [cate, setCate] = useState([]);
  const [cateNum, setCateNum] = useState(1);
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

  // 운동 종류별 반환
  const getExerType = async () => {
    await client
      .get("/exercise/categories")
      .then((res) => {
        if (res.status === 200) setCate([...res.data]);
      })
      .catch((e) => e.res);
  };
  useEffect(() => {
    getExerType();
  }, []);

  // 운동 종류별 클릭시 렌더링
  const onHandleType = async (exerciseCategoryId) => {
    setCateNum(exerciseCategoryId);
  };

  return (
    <CardWrapper>
      <TypeBox
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        ref={scrollRef}
      >
        {cate.map((cates) => (
          <HealthButton
            {...cates}
            key={cates.exerciseCategoryId}
            onClick={() => {
              onHandleType(cates.exerciseCategoryId);
            }}
            textColor={
              cates.exerciseCategoryId === cateNum ? "black" : "#7B7B7B"
            }
            fontWeight={
              cates.exerciseCategoryId === cateNum ? "bolder" : "normal"
            }
          >
            {cates.exerciseCategoryName}
          </HealthButton>
        ))}
      </TypeBox>
      <HealthFindList
        typeNum={cateNum}
        key={cateNum + "category"}
        type={"category"}
      />
    </CardWrapper>
  );
};

export default HealthFindType;
