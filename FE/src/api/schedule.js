import { client } from "./index";

// 회원의 요일별 영양제&운동 갯수 조회
export const getYoilInfo = async () => {
  const result = await client
    .get(`/calendars`)
    .then((response) => response)
    .catch((error) => error.response);
    return result;
};

// 회원의 요일별 상세 일정 조회
export const getYoilDetail = async (calendarDate) => {
  const result = await client
    .get(`/calendars/${calendarDate}`)
    .then((response) => response)
    .catch((error) => error.response);
    return result;
};

// 일정 등록
export const postSchedule = async (data) => {
  const result = await client
    .post(`/calendars`, data)
    .then((response) => response)
    .catch((error) => error.response);
    return result;
};

// 일정 수정
export const editSchedule = async (scheduleId) => {
  const result = await client
    .put(`/calendars/${scheduleId}`, data)
    .then((response) => response)
    .catch((error) => error.response);
    return result;
};


// 일정 삭제
export const deleteSchedule = async (scheduleId) => {
  const result = await client
    .delete(`/calendars/${scheduleId}`)
    .then((response) => response)
    .catch((error) => error.response);
    return result;
};

// 일정 완료 체크 & 체크 해제
export const doneSchedule = async (scheduleId) => {
  const result = await client
    .patch(`/calendars/${scheduleId}`)
    .then((response) => response)
    .catch((error) => error.response);
    return result;
};

// 운동 검색
export const searchExerSchedule = async () => {
  const result = await client
    .get(`/exercise/calendar-list`, params)
    .then((response) => response)
    .catch((error) => error.response);
    return result;
};