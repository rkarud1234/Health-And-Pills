import { client } from "./index";

// 운동 상세정보조회
export const getExerciseDetail = async (exerciseId) => {
  const result = await client
    .get(`/exercise/${exerciseId}`)
    .then((response) => response)
    .catch((error) => error.response);
    return result;
};

// 현재 운동과 유사한 운동(스쿼트와 유사한 운동 추천)
export const getExerciseItemReco = async(exerciseId) => {
  const result = await client
    .get(`/recommend/exercises/item/${exerciseId}`)
    .then((response) => response)
    .catch((error) => error.response);
    return result;
};

// 운동중 체크/취소
export const exerciseDoing = async (data) => {
  const result = await client
    .post(`/exercise/doing`, data)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

// 좋아요/싫어요
export const exerciseLike = async (data) => {
  const result = await client
    .post(`/exercise/like`, data)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

// 북마크/취소
export const exerciseBookMark = async (data) => {
  const result = await client
    .post(`/exercise/bookmark`, data)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

// 베스트 운동 추천
export const getExerciseBest = async () => {
  const result = await client
    .get(`/recommend/exercises/best`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

// 사용자 맞춤 운동 추천
export const getExerciseCustom = async () => {
  const result = await client
    .get(`/recommend/exercises/user`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

// 유사한 사용자 운동 추천
export const getExerciseUser = async () => {
  const result = await client
    .get(`/recommend/exercises/user`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};