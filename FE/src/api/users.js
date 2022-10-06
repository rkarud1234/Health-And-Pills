import { client } from "./index";

export const getProfile = async () => {
  const result = await client.get("/users").then((response) => response);
  return result;
};

export const createProfile = async (data) => {
  const result = await client.post("/users", data).then((response) => response);
  return result;
};

export const getUserInfo = async (type) => {
  const result = await client
    .get(`/users/${type}`)
    .then((response) => response.json());
  return result;
};

export const fetchUserExercise = async (page) => {
  const result = await client
    .get(`/users/exercise`, { params: { page } })
    .then((response) => response);
  return result;
};

export const updateUserExercise = async (data) => {
  const result = await client
    .put(`/users/exercise`, data)
    .then((response) => response);
  return result;
};

export const updateUserinbody = async (data) => {
  const result = await client
    .put(`/users/inbody`, data)
    .then((response) => response);
  return result;
};

export const fetchUserPill = async (page) => {
  const result = await client
    .get(`/users/pill`, { params: { page } })
    .then((response) => response);
  return result;
};

export const fetchUserPillBookmark = async (page) => {
  const result = await client
    .get(`/users/pill/bookmark`, { params: { page } })
    .then((response) => response);
  return result;
};

export const fetchUserExerciseBookmark = async (page) => {
  const result = await client
    .get(`/users/exercise/bookmark`, { params: { page } })
    .then((response) => response);
  return result;
};

export const fetchUserReview = async (page) => {
  const result = await client
    .get(`/users/review`, { params: { page } })
    .then((response) => response);
  return result;
};
