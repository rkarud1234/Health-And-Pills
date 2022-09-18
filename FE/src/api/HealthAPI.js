import { client } from "./index";

// 운동 상세정보조회
export const getExerciseDetail = async(exercise_id) => {
  const result = await client
    .get(`/exercise/${exercise_id}`)
    .then((response) => response);
    return result;
};

// 현재 운동과 유사한 운동(스쿼트와 유사한 운동 추천)
export const getExerciseItemReco = async(exercise_id) => {
  const result = await client
    .get(`/exercise/recommend/item/${exercise_id}`)
    .then((response) => response);
    return result;
}

// 운동중 체크/취소
export const exerciseDoing = async(data) => {
  const result = await client
    .patch(`/exercise/doing`, data)
    .then((response) => response)
    .catch((error) => error);
  return result;
}

// 좋아요/싫어요
export const exerciseLike = async(data) => {
  const result = await client
    .patch(`/exercise/like`, data)
    .then((response) => response)
    .catch((error) => error);
  return result;
}

// 북마크/취소
export const exerciseBookMark = async(data) => {
  const result = await client
    .patch(`/exercise/bookmark`, data)
    .then((response) => response)
    .catch((error) => error);
  return result;
}