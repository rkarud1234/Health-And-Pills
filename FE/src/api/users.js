import { client } from "../utils/client";

const getProfile = async () => {
  const result = await client.get("/users").then((response) => response);
  return result;
};

const createProfile = async (data) => {
  const result = await client.post("/users", data).then((response) => response);
  return result;
};

export { getProfile };
