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

export const fetchUserExercise = async () => {
  const result = await client
    .get("/users/exercise")
    .then((response) => response);
  return result;
};

export const fetchUserPill = async () => {
  const result = await client.get("/users/pill").then((response) => response);
  return result;
};

export const fetchUserBookmark = async (type) => {
  const result = await client
    .get(`/users/${type}/bookmark`)
    .then((response) => response);
  return result;
};
