import axios from "axios";
const BASE_URL = "https://j7b203.p.ssafy.io/api/";

export const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use(function (config) {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const refreshToken = sessionStorage.getItem("REFRESH_TOKEN");
  if (!accessToken || !refreshToken) {
    config.headers["Authorization"] = null;
    config.headers["RefreshToken"] = null;
    return config;
  }
  config.headers["Authorization"] = `Bearer ${accessToken}`;
  config.headers["RefreshToken"] = refreshToken;
  return config;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      const originalRequest = error.config;
      const response = await client
        .get("auth/refreshToken")
        .then((response) => response);
      sessionStorage.removeItem("ACCESS_TOKEN");
      sessionStorage.removeItem("REFRESH_TOKEN");
      const accessToken = response.headers["accesstoken"];
      const refreshToken = response.headers["refreshtoken"];
      sessionStorage.setItem("ACCESS_TOKEN", accessToken);
      sessionStorage.setItem("REFRESH_TOKEN", refreshToken);
      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
      originalRequest.headers["RefreshToken"] = refreshToken;

      return await client.request(originalRequest);
    }
    return Promise.reject(error);
  }
);
