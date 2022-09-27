package com.ssafy.hp.calendar.controller;

import com.ssafy.hp.ControllerTest;
import com.ssafy.hp.calendar.service.CalendarService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;

import java.util.Arrays;

import static com.ssafy.hp.CommonFixture.TEST_AUTHORIZATION;
import static com.ssafy.hp.calendar.CalendarFixture.*;
import static com.ssafy.hp.calendar.CalendarFixture.ID;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.mockito.Mockito.times;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CalendarController.class)
class CalendarControllerTest extends ControllerTest {
    @MockBean
    private CalendarService calendarService;

    @Test
    @DisplayName("회원의 요일별 영양제 & 운동 갯수 조회한다.")
    void findListByCalendarDate() throws Exception {
        // given
        given(calendarService.findListByCalendarDate(any()))
                .willReturn(Arrays.asList(TEST_CALENDAR_COUNT_LIST_RESPONSE));

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/calendar")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(Arrays.asList(TEST_CALENDAR_COUNT_LIST_RESPONSE))))
                .andDo(document("api/calendar/count",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("결과배열"),
                                fieldWithPath("[].calendarDate").type(JsonFieldType.NUMBER).description("요일"),
                                fieldWithPath("[].pillCount").type(JsonFieldType.NUMBER).description("영양제 갯수"),
                                fieldWithPath("[].exerciseCount").type(JsonFieldType.NUMBER).description("운동 갯수")
                        )));

        // then
        then(calendarService).should(times(1)).findListByCalendarDate(any());
    }

    @Test
    @DisplayName("회원의 요일별 상세 일정 조회한다.")
    void findByCalendarDate() throws Exception {
        // given
        given(calendarService.findByCalendarDate(any(), anyInt()))
                .willReturn(Arrays.asList(TEST_CALENDAR_DETAIL_LIST_RESPONSE));

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/calendar/{calendar_date}", DATE)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(Arrays.asList(TEST_CALENDAR_DETAIL_LIST_RESPONSE))))
                .andDo(document("api/calendar/list",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("calendar_date").description("요일")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("결과 배열"),
                                fieldWithPath("[].exerciseId").type(JsonFieldType.NUMBER).description("운동 ID"),
                                fieldWithPath("[].pillId").type(JsonFieldType.NUMBER).description("영양제 ID"),
                                fieldWithPath("[].name").type(JsonFieldType.STRING).description("이름"),
                                fieldWithPath("[].calendarDate").type(JsonFieldType.NUMBER).description("요일"),
                                fieldWithPath("[].calendarTime").type(JsonFieldType.STRING).description("일정 시간"),
                                fieldWithPath("[].calendarContent").type(JsonFieldType.STRING).description("내용"),
                                fieldWithPath("[].calendarComplete").type(JsonFieldType.STRING).description("완료여부")
                        )));


        // then
        then(calendarService).should(times(1)).findByCalendarDate(any(), anyInt());
    }

    @Test
    @DisplayName("일정을 등록한다")
    void createCalendar() throws Exception {
        // given
        willDoNothing()
                .given(calendarService)
                .createCalendar(any(), any());

        // when
        mockMvc.perform(post("/api/calendar")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_CALENDAR_CREATE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/calendar/create",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        requestFields(
                                fieldWithPath("exerciseId").type(JsonFieldType.NUMBER).description("운동 ID"),
                                fieldWithPath("pillId").type(JsonFieldType.NUMBER).description("영양제 ID"),
                                fieldWithPath("calendarDate").type(JsonFieldType.NUMBER).description("요일"),
                                fieldWithPath("calendarTime").type(JsonFieldType.STRING).description("일정 시간"),
                                fieldWithPath("calendarContent").type(JsonFieldType.STRING).description("내용")
                        )));


        // then
        then(calendarService).should(times(1)).createCalendar(any(), any());
    }

    @Test
    @DisplayName("일정을 수정한다.")
    void updateCalendar() throws Exception{
        // given
        willDoNothing()
                .given(calendarService)
                .updateCalendar(any(), anyInt(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/calendar/{calendar_id}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_CALENDAR_UPDATE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/calendar/{calendar_id}/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("calendar_id").description("일정 ID")
                        ),
                        requestFields(
                                fieldWithPath("calendarContent").type(JsonFieldType.STRING).description("내용"),
                                fieldWithPath("calendarTime").type(JsonFieldType.STRING).description("일정 시간")
                        )));

        // then
        then(calendarService).should(times(1)).updateCalendar(any(), anyInt(), any());
    }

    @Test
    @DisplayName("일정을 삭제한다.")
    void deleteCalendar() throws Exception {
        // given
        willDoNothing()
                .given(calendarService)
                .deleteCalendar(any(), anyInt());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/calendar/{calendar_id}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/calendar/{calendar_id}/delete",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("calendar_id").description("일정 ID")
                        )));

        // then
        then(calendarService).should(times(1)).deleteCalendar(any(), anyInt());
    }

    @Test
    @DisplayName("일정 완료 체크 & 체크 해제한다.")
    void updateCalendarComplete() throws Exception {
        // given
        willDoNothing()
                .given(calendarService)
                .updateCalendarComplete(any(), anyInt());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.patch("/api/calendar/{calendar_id}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/calendar/{calendar_id}/patch",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("calendar_id").description("일정 ID")
                        )));

        // then
        then(calendarService).should(times(1)).updateCalendarComplete(any(), anyInt());
    }
}