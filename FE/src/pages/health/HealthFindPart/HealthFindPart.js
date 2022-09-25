import HealthCard from "../../../components/cards/HealthCard";
import { useEffect, useState, useCallback, useRef } from "react";
import { client } from "../../../api";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import React from "react";

const HealthButton = styled.button`
background-color: ${({ color }) => color};
color: ${({ textColor }) => textColor};
font-size: 16px;
cursor: pointer;
`

const HealthFindPart = () => {

  const [part, setPart] = useState([]);
  const [partItems, setPartItems] = useState([]);

  const [partNum, setPartNum] = useState(1);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  // 운동 부위별 반환
  const getExerPart = async () => {
    await client
      .get('/exercise/part-categories')
      .then((res) => {
        if (res.status === 200)
        setPart([...res.data])
      })
      .catch((e) => e.res);
  };
  useEffect(() => {
    getExerPart();
  }, []);

  // 운동 부위별 클릭시 렌더링
  const onHandlePart = async (exercisePartCategoryId) => {
    setPartNum(exercisePartCategoryId)
  }

  // 운동 부위별 조회
  const getPartItems = useCallback(async (partNum) => {
    setLoading(true);
    await client
      .get(`/exercise/part?part=${partNum}&page=${page}`)
      .then((res) => {
        setPartItems([...res.data.content]);
      })
      .catch((e) => {console.log(e)})
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
  }, [partNum, page]);
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
        {part.map((parts) => (
          <HealthButton
          {...parts} key={parts.exercisePartCategoryId}
          onClick={() => {onHandlePart(parts.exercisePartCategoryId); getPartItems(parts.exercisePartCategoryId)}}
          >
            {parts.exercisePartCategoryId}{parts.exercisePartCategoryName}
          </HealthButton>
        ))}
        <div>
          {partItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {partItems.length - 1 == idx ? (
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
        </div>
    </>
  );
};

export default HealthFindPart;