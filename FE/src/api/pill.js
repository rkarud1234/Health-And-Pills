import { client } from "./index";

export const deleteUserPill = async (pillId) => {
  const data = {
    pillId,
    check: "N",
  };
  const result = await client
    .post("/pills/taking", data)
    .then((response) => response);
  return result;
};

export const editPillReivew = async ({ reviewId, data }) => {
  const result = await client
    .put(`/pills/review/${reviewId}`, data)
    .then((response) => response);

  return result;
};

export const deletePillReview = async (reviewId) => {
  const result = await client
    .delete(`/pills/review/${reviewId}`)
    .then((response) => response);
  return result;
};

export const deleteUserPillBookmark = async (pillId) => {
  const data = {
    pillId: pillId,
    check: "N",
  };
  const result = await client
    .post(`/pills/bookmark`, data)
    .then((response) => response);
  return result;
};
