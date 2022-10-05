import { useMemo } from "react";
import styled from "styled-components";
import { client } from "../../api";
import HealthListCard from "../../components/cards/HealthListCard";
import useFetchData from "../../hooks/useFetchData";
import useIntersect from "../../hooks/useIntersect";

const ExerciseCategoryListWrapper = styled.div`
  overflow: scroll;
  height: 80vh;
`;
const Target = styled.div`
  height: 1px;
`;
const fetchExerciseCategory = async (page, rest) => {
  const result = await client
    .get(`/exercise/category?category=${rest[0]}&page=${page}`)
    .then((response) => response);
  return result;
};

const fetchExercisePart = async (page, rest) => {
  const result = await client
    .get(`/exercise/part?part=${rest[0]}&page=${page}`)
    .then((response) => response);
  return result;
};

const fetchUrl = {
  category: fetchExerciseCategory,
  part: fetchExercisePart,
};
const HealthFindList = ({ typeNum, type }) => {
  const { res } = useFetchData(
    fetchUrl[type],
    "searchExerciseCategory",
    () => {},
    () => {},
    typeNum
  );

  const findExerciseList = useMemo(
    () =>
      res.data
        ? res.data.pages.flatMap((item) => {
            return item.data.content;
          })
        : [],
    [res.data]
  );
  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (res.hasNextPage && !res.isFetching) {
      res.fetchNextPage();
    }
  });
  return (
    <ExerciseCategoryListWrapper>
      {findExerciseList.length !== 0 ? (
        findExerciseList.map((item) => (
          <HealthListCard
            key={type + item.exerciseId + item.exerciseName + type + typeNum}
            {...item}
          />
        ))
      ) : (
        <>
          <h1>등록된 정보가 없습니다.</h1>
        </>
      )}
      <Target ref={ref} />
    </ExerciseCategoryListWrapper>
  );
};

export default HealthFindList;
