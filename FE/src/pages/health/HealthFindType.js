import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { client } from "../../api";
import HealthFindBody from "../health/HealthFindPart/HealthFindBody";
import HealthFindSports from "../health/HealthFindPart/HealthFindSports";
import HealthFindGigu from "./HealthFindPart/HealthFindGigu";
import HealthCard from "../../components/cards/HealthCard";
import { useInView } from "react-intersection-observer";
import React from "react";

const TapWrapper = styled.div`
  width: 100vw;
`

const HealthButton = styled.button`
background-color: ${({ color }) => color};
color: ${({ textColor }) => textColor};
font-size: 16px;
cursor: pointer;
`

const HealthFindType = ({exerciseId}) => {
  // const [typePage, setTypePage] = useState("body")
  // const findPage = {
  //   body: <HealthFindBody/>,
  //   gigu: <HealthFindGigu/>,
  //   sports: <HealthFindSports/>
  // }

  const [cate, setCate] = useState([]);
  const [items, setItems] = useState([]);

  const [cateNum, setCateNum] = useState(1);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  // 운동 종류별 반환
  const getExerType = async () => {
    await client
      .get('/exercise/categories')
      .then((res) => {
        if (res.status === 200)
        setCate([...res.data])
      })
      .catch((e) => e.res);
  };
  useEffect(() => {
    getExerType();
  }, []);

  // 운동 종류별 클릭시 렌더링
  const onHandleType = async (exerciseCategoryId) => {
    setCateNum(exerciseCategoryId)
  }

  // 운동 종류별 조회 --> cateNum, page 따로
  const getCateItems = useCallback(async (cateNum) => {
    setLoading(true);
    await client
      .get(`/exercise/category?category=${cateNum}&page=${page}`)
      .then((res) => {
        setItems([...res.data.content])
        // setItems((prevState) => [...prevState, ...res.data.content])
      })
      .catch((e) => {console.log(e)})
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
  }, [cateNum, page]);
  useEffect(() => {
    getCateItems(1);
  }, []);
  // console.log(items)


  // useEffect(() => {
  //   // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
  //   if (inView && !loading) {
  //     setPage((prevState) => prevState + 1);
  //   }
  // }, [inView, loading]);

  return (
    <>
    <TapWrapper>
      {cate.map((cates) => (
        <HealthButton
          {...cates} key={cates.exerciseCategoryId}
          onClick = {() => {onHandleType(cates.exerciseCategoryId); getCateItems(cates.exerciseCategoryId)}}
        >
          {cates.exerciseCategoryId}{cates.exerciseCategoryName}
        </HealthButton>
      ))}
        {items.map((item, idx) => (
            <React.Fragment key={idx}>
              {items.length - 1 == idx ? (
                <>
                  <div ref={ref}>
                    <HealthCard
                      {...item}
                      key={idx}
                    >
                    </HealthCard>
                  </div>
                </>
              ) : (
                <>
                  <HealthCard
                    {...item}
                    key={idx}
                    width="320px"
                  >
                  </HealthCard>
                </>
              )}
            </React.Fragment>
          ))}
    </TapWrapper>
    </>
  )
}

export default HealthFindType;