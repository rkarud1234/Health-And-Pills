import { client } from "./index";

// 운동 상세정보조회
export const getExerciseDetail = async (exerciseId) => {
  const result = await client
    .get(`/exercise/${exerciseId}`)
    .then((response) => response)
    .catch((error) => error.response);
    return result;
};

 export const getExDetail = async () => {
  await client
    .get(`/exercise/1`)
    .then((response) => {
      if (response.status === 200)
      console.log(response.data)
    })
    .catch((error) => console.log(error));
}


// 현재 운동과 유사한 운동(스쿼트와 유사한 운동 추천)
export const getExerciseItemReco = async(exerciseId) => {
  const result = await client
    .get(`/exercise/recommend/item/${exerciseId}`)
    .then((response) => response);
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
