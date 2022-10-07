package com.ssafy.hp.user.controller;

import com.ssafy.hp.ControllerTest;
import com.ssafy.hp.user.response.UserExerciseResponse;
import com.ssafy.hp.user.response.UserPillResponse;
import com.ssafy.hp.user.response.UserReviewPillResponse;
import com.ssafy.hp.user.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;


import java.util.Arrays;

import static com.ssafy.hp.CommonFixture.TEST_AUTHORIZATION;
import static com.ssafy.hp.user.UserFixture.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.mockito.Mockito.times;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(UserController.class)
class UserControllerTest extends ControllerTest {
    @MockBean
    private UserService userService;

    @Test
    @DisplayName("회원의 필수정보를 등록한다")
    void createUserProfile() throws Exception {
        // given
        willDoNothing()
                .given(userService)
                .createUserProfile(any(), any());

        // when
        mockMvc.perform(post("/api/users")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_CREATE_USER_PROFILE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/users/insert",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        requestFields(
                                fieldWithPath("userProfileBirthday").type(JsonFieldType.STRING).description("생년월일"),
                                fieldWithPath("userProfileGender").type(JsonFieldType.STRING).description("성별"),
                                fieldWithPath("exercisePurposeId").type(JsonFieldType.NUMBER).description("운동목적"),
                                fieldWithPath("exerciseTimes").type(JsonFieldType.NUMBER).description("운동횟수")
                        )));

        // then
        then(userService).should(times(1)).createUserProfile(any(), any());
    }

    @Test
    @DisplayName("본인 정보를 조회한다")
    void findUser() throws Exception {
        // given
        given(userService.findUser(any()))
                .willReturn(TEST_USER_INFO_RESPONSE);


        // when
        mockMvc.perform(get("/api/users")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_USER_INFO_RESPONSE)))
                .andDo(document("api/users/search",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        responseFields(
                                fieldWithPath("userProfileNickname").type(JsonFieldType.STRING).description("회원 이름"),
                                fieldWithPath("userProfileBirthday").type(JsonFieldType.STRING).description("회원 생년월일"),
                                fieldWithPath("userProfileGender").type(JsonFieldType.STRING).description("회원 성별"),
                                fieldWithPath("exercisePurposeId").type(JsonFieldType.NUMBER).description("회원 운동목적ID"),
                                fieldWithPath("exerciseTimes").type(JsonFieldType.NUMBER).description("회원 운동횟수ID"),
                                fieldWithPath("userProfileHeight").type(JsonFieldType.NUMBER).description("회원 신장"),
                                fieldWithPath("userProfileWeight").type(JsonFieldType.NUMBER).description("회원 체중"),
                                fieldWithPath("userProfileFat").type(JsonFieldType.NUMBER).description("회원 체지방량"),
                                fieldWithPath("userProfileSkeleton").type(JsonFieldType.NUMBER).description("회원 골격근량"),
                                fieldWithPath("userProfileWater").type(JsonFieldType.NUMBER).description("회원 체수분량")
                        )
                ));

        // then
        then(userService).should(times(1)).findUser(any());
    }

    @Test
    @DisplayName("나의 운동중 운동리스트 조회")
    void findTakingExerciseByUserId() throws Exception {
        // given
        Page<UserExerciseResponse> result = new PageImpl<>(Arrays.asList(TEST_USER_EXERCISE_RESPONSE), PageRequest.of(0, 15), 1);
        given(userService.findTakingExerciseByUser(any(), any()))
                .willReturn(result);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/users/exercise")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .param("page", "0")
                        .param("size", "15"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(result)))
                .andDo(document("api/users/exercise",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        requestParameters(
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 사이즈")
                        ),
                        responseFields(
                                fieldWithPath("content").type(JsonFieldType.ARRAY).description("조회 결과 배열"),
                                fieldWithPath("content.[].id").type(JsonFieldType.NUMBER).description("회원 운동 ID"),
                                fieldWithPath("content.[].relatedItemId").type(JsonFieldType.NUMBER).description("운동 ID"),
                                fieldWithPath("content.[].name").type(JsonFieldType.STRING).description("운동이름"),
                                fieldWithPath("content.[].type").type(JsonFieldType.ARRAY).description("운동부위 배열"),
                                fieldWithPath("pageable").type(JsonFieldType.OBJECT).description("페이지 관련 정보"),
                                fieldWithPath("pageable.sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬 여부"),
                                fieldWithPath("pageable.sort.unsorted").type(JsonFieldType.BOOLEAN).description("비정렬 여부"),
                                fieldWithPath("pageable.sort.empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부"),
                                fieldWithPath("pageable.offset").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("pageable.pageNumber").type(JsonFieldType.NUMBER).description("현재 페이지 번호"),
                                fieldWithPath("pageable.pageSize").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("pageable.paged").type(JsonFieldType.BOOLEAN).description("페이징 여부"),
                                fieldWithPath("pageable.unpaged").type(JsonFieldType.BOOLEAN).description("비페이징 여부"),
                                fieldWithPath("last").type(JsonFieldType.BOOLEAN).description("마지막 페이지 여부"),
                                fieldWithPath("totalPages").type(JsonFieldType.NUMBER).description("총 페이지 크기"),
                                fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("총 요소 크기"),
                                fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("number").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                fieldWithPath("sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬여부"),
                                fieldWithPath("sort.unsorted").type(JsonFieldType.BOOLEAN).description("비정렬여부"),
                                fieldWithPath("sort.empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부"),
                                fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("현재 페이지 크기"),
                                fieldWithPath("first").type(JsonFieldType.BOOLEAN).description("처음 페이지 여부"),
                                fieldWithPath("empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부")
                        )));

        // then
        then(userService).should(times(1)).findTakingExerciseByUser(any(), any());
    }

    @Test
    @DisplayName("나의 북마크 운동리스트 조회")
    void findBookmarkExerciseByUserId() throws Exception {
        // given
        Page<UserExerciseResponse> result = new PageImpl<>(Arrays.asList(TEST_USER_EXERCISE_RESPONSE), PageRequest.of(0, 15), 1);
        given(userService.findBookmarkExerciseByUser(any(), any()))
                .willReturn(result);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/users/exercise/bookmark")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .param("page", "0")
                        .param("size", "15"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(result)))
                .andDo(document("api/users/exercise/bookmark",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        requestParameters(
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 사이즈")
                        ),
                        responseFields(
                                fieldWithPath("content").type(JsonFieldType.ARRAY).description("조회 결과 배열"),
                                fieldWithPath("content.[].id").type(JsonFieldType.NUMBER).description("회원 운동 ID"),
                                fieldWithPath("content.[].relatedItemId").type(JsonFieldType.NUMBER).description("운동 ID"),
                                fieldWithPath("content.[].name").type(JsonFieldType.STRING).description("운동이름"),
                                fieldWithPath("content.[].type").type(JsonFieldType.ARRAY).description("운동부위 배열"),
                                fieldWithPath("pageable").type(JsonFieldType.OBJECT).description("페이지 관련 정보"),
                                fieldWithPath("pageable.sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬 여부"),
                                fieldWithPath("pageable.sort.unsorted").type(JsonFieldType.BOOLEAN).description("비정렬 여부"),
                                fieldWithPath("pageable.sort.empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부"),
                                fieldWithPath("pageable.offset").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("pageable.pageNumber").type(JsonFieldType.NUMBER).description("현재 페이지 번호"),
                                fieldWithPath("pageable.pageSize").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("pageable.paged").type(JsonFieldType.BOOLEAN).description("페이징 여부"),
                                fieldWithPath("pageable.unpaged").type(JsonFieldType.BOOLEAN).description("비페이징 여부"),
                                fieldWithPath("last").type(JsonFieldType.BOOLEAN).description("마지막 페이지 여부"),
                                fieldWithPath("totalPages").type(JsonFieldType.NUMBER).description("총 페이지 크기"),
                                fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("총 요소 크기"),
                                fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("number").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                fieldWithPath("sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬여부"),
                                fieldWithPath("sort.unsorted").type(JsonFieldType.BOOLEAN).description("비정렬여부"),
                                fieldWithPath("sort.empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부"),
                                fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("현재 페이지 크기"),
                                fieldWithPath("first").type(JsonFieldType.BOOLEAN).description("처음 페이지 여부"),
                                fieldWithPath("empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부")
                        )));

        // then
        then(userService).should(times(1)).findBookmarkExerciseByUser(any(), any());
    }

    @Test
    @DisplayName("나의 좋아요 운동리스트 조회")
    void findLikeExerciseByUserId() throws Exception {
        // given
        Page<UserExerciseResponse> result = new PageImpl<>(Arrays.asList(TEST_USER_EXERCISE_RESPONSE), PageRequest.of(0, 15), 1);
        given(userService.findLikeExerciseByUser(any(), any()))
                .willReturn(result);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/users/like")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .param("page", "0")
                        .param("size", "15"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(result)))
                .andDo(document("api/users/like",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        requestParameters(
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 사이즈")
                        ),
                        responseFields(
                                fieldWithPath("content").type(JsonFieldType.ARRAY).description("조회 결과 배열"),
                                fieldWithPath("content.[].id").type(JsonFieldType.NUMBER).description("회원 운동 ID"),
                                fieldWithPath("content.[].relatedItemId").type(JsonFieldType.NUMBER).description("운동 ID"),
                                fieldWithPath("content.[].name").type(JsonFieldType.STRING).description("운동이름"),
                                fieldWithPath("content.[].type").type(JsonFieldType.ARRAY).description("운동부위 배열"),
                                fieldWithPath("pageable").type(JsonFieldType.OBJECT).description("페이지 관련 정보"),
                                fieldWithPath("pageable.sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬 여부"),
                                fieldWithPath("pageable.sort.unsorted").type(JsonFieldType.BOOLEAN).description("비정렬 여부"),
                                fieldWithPath("pageable.sort.empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부"),
                                fieldWithPath("pageable.offset").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("pageable.pageNumber").type(JsonFieldType.NUMBER).description("현재 페이지 번호"),
                                fieldWithPath("pageable.pageSize").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("pageable.paged").type(JsonFieldType.BOOLEAN).description("페이징 여부"),
                                fieldWithPath("pageable.unpaged").type(JsonFieldType.BOOLEAN).description("비페이징 여부"),
                                fieldWithPath("last").type(JsonFieldType.BOOLEAN).description("마지막 페이지 여부"),
                                fieldWithPath("totalPages").type(JsonFieldType.NUMBER).description("총 페이지 크기"),
                                fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("총 요소 크기"),
                                fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("number").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                fieldWithPath("sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬여부"),
                                fieldWithPath("sort.unsorted").type(JsonFieldType.BOOLEAN).description("비정렬여부"),
                                fieldWithPath("sort.empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부"),
                                fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("현재 페이지 크기"),
                                fieldWithPath("first").type(JsonFieldType.BOOLEAN).description("처음 페이지 여부"),
                                fieldWithPath("empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부")
                        )));

        // then
        then(userService).should(times(1)).findLikeExerciseByUser(any(), any());
    }

    @Test
    @DisplayName("해당 운동에 대한 나의 정보조회")
    void findByExerciseId() throws Exception {
        // given
        given(userService.findByExercise(any(), anyInt()))
                .willReturn(TEST_USER_EXERCISE_INFO_RESPONSE);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/users/exercise/{exercise_id}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_USER_EXERCISE_INFO_RESPONSE)))
                .andDo(document("api/users/exercise/{exercise_id}",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("exercise_id").description("운동 ID")
                        ),
                        responseFields(
                                fieldWithPath("exerciseDoing").type(JsonFieldType.STRING).description("운동중 여부"),
                                fieldWithPath("exerciseBookmark").type(JsonFieldType.STRING).description("복용중 여부"),
                                fieldWithPath("exerciseLike.").type(JsonFieldType.STRING).description("좋아요 여부")
                        )));

        // then
        then(userService).should(times(1)).findByExercise(any(), anyInt());
    }

    @Test
    @DisplayName("나의 복용중 영양제리스트 조회")
    void findTakingPillByUserId() throws Exception {
        // given
        Page<UserPillResponse> result = new PageImpl<>(Arrays.asList(TEST_USER_PILL_RESPONSE), PageRequest.of(0, 15), 1);
        given(userService.findTakingPillByUser(any(), any()))
                .willReturn(result);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/users/pill")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .param("page", "0")
                        .param("size", "15"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(result)))
                .andDo(document("api/users/pill",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        requestParameters(
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 사이즈")
                        ),
                        responseFields(
                                fieldWithPath("content").type(JsonFieldType.ARRAY).description("조회 결과 배열"),
                                fieldWithPath("content.[].id").type(JsonFieldType.NUMBER).description("회원 영양제 ID"),
                                fieldWithPath("content.[].relatedItemId").type(JsonFieldType.NUMBER).description("영양제 ID"),
                                fieldWithPath("content.[].name").type(JsonFieldType.STRING).description("영양제 이름"),
                                fieldWithPath("content.[].rating").type(JsonFieldType.NUMBER).description("영양제 평점"),
                                fieldWithPath("content.[].img").type(JsonFieldType.STRING).description("영양제 이미지"),
                                fieldWithPath("pageable").type(JsonFieldType.OBJECT).description("페이지 관련 정보"),
                                fieldWithPath("pageable.sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬 여부"),
                                fieldWithPath("pageable.sort.unsorted").type(JsonFieldType.BOOLEAN).description("비정렬 여부"),
                                fieldWithPath("pageable.sort.empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부"),
                                fieldWithPath("pageable.offset").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("pageable.pageNumber").type(JsonFieldType.NUMBER).description("현재 페이지 번호"),
                                fieldWithPath("pageable.pageSize").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("pageable.paged").type(JsonFieldType.BOOLEAN).description("페이징 여부"),
                                fieldWithPath("pageable.unpaged").type(JsonFieldType.BOOLEAN).description("비페이징 여부"),
                                fieldWithPath("last").type(JsonFieldType.BOOLEAN).description("마지막 페이지 여부"),
                                fieldWithPath("totalPages").type(JsonFieldType.NUMBER).description("총 페이지 크기"),
                                fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("총 요소 크기"),
                                fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("number").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                fieldWithPath("sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬여부"),
                                fieldWithPath("sort.unsorted").type(JsonFieldType.BOOLEAN).description("비정렬여부"),
                                fieldWithPath("sort.empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부"),
                                fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("현재 페이지 크기"),
                                fieldWithPath("first").type(JsonFieldType.BOOLEAN).description("처음 페이지 여부"),
                                fieldWithPath("empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부")
                        )));

        // then
        then(userService).should(times(1)).findTakingPillByUser(any(), any());
    }

    @Test
    @DisplayName("나의 북마크 영양제리스트 조회")
    void findBookmarkPillByUserId() throws Exception {
        // given
        Page<UserPillResponse> result = new PageImpl<>(Arrays.asList(TEST_USER_PILL_RESPONSE), PageRequest.of(0, 15), 1);
        given(userService.findBookmarkPillByUser(any(), any()))
                .willReturn(result);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/users/pill/bookmark")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .param("page", "0")
                        .param("size", "20"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(result)))
                .andDo(document("api/users/pill/bookmark",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        requestParameters(
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 사이즈")
                        ),
                        responseFields(
                                fieldWithPath("content").type(JsonFieldType.ARRAY).description("조회 결과 배열"),
                                fieldWithPath("content.[].id").type(JsonFieldType.NUMBER).description("회원 영양제 ID"),
                                fieldWithPath("content.[].relatedItemId").type(JsonFieldType.NUMBER).description("영양제 ID"),
                                fieldWithPath("content.[].name").type(JsonFieldType.STRING).description("영양제 이름"),
                                fieldWithPath("content.[].rating").type(JsonFieldType.NUMBER).description("영양제 평점"),
                                fieldWithPath("content.[].img").type(JsonFieldType.STRING).description("영양제 이미지"),
                                fieldWithPath("pageable").type(JsonFieldType.OBJECT).description("페이지 관련 정보"),
                                fieldWithPath("pageable.sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬 여부"),
                                fieldWithPath("pageable.sort.unsorted").type(JsonFieldType.BOOLEAN).description("비정렬 여부"),
                                fieldWithPath("pageable.sort.empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부"),
                                fieldWithPath("pageable.offset").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("pageable.pageNumber").type(JsonFieldType.NUMBER).description("현재 페이지 번호"),
                                fieldWithPath("pageable.pageSize").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("pageable.paged").type(JsonFieldType.BOOLEAN).description("페이징 여부"),
                                fieldWithPath("pageable.unpaged").type(JsonFieldType.BOOLEAN).description("비페이징 여부"),
                                fieldWithPath("last").type(JsonFieldType.BOOLEAN).description("마지막 페이지 여부"),
                                fieldWithPath("totalPages").type(JsonFieldType.NUMBER).description("총 페이지 크기"),
                                fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("총 요소 크기"),
                                fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("number").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                fieldWithPath("sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬여부"),
                                fieldWithPath("sort.unsorted").type(JsonFieldType.BOOLEAN).description("비정렬여부"),
                                fieldWithPath("sort.empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부"),
                                fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("현재 페이지 크기"),
                                fieldWithPath("first").type(JsonFieldType.BOOLEAN).description("처음 페이지 여부"),
                                fieldWithPath("empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부")
                        )));

        // then
        then(userService).should(times(1)).findBookmarkPillByUser(any(), any());
    }

    @Test
    @DisplayName("나의 리뷰 영양제리스트 조회")
    void findReviewPillByUserId() throws Exception {
        // given
        Page<UserReviewPillResponse> result = new PageImpl<>(Arrays.asList(TEST_USER_REVIEW_PILL_RESPONSE), PageRequest.of(0, 15), 1);
        given(userService.findReviewPillByUser(any(), any()))
                .willReturn(result);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/users/review")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .param("page", "0")
                        .param("size", "20"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(result)))
                .andDo(document("api/users/review",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        requestParameters(
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 사이즈")
                        ),
                        responseFields(
                                fieldWithPath("content").type(JsonFieldType.ARRAY).description("조회 결과 배열"),
                                fieldWithPath("content.[].id").type(JsonFieldType.NUMBER).description("회원 영양제 ID"),
                                fieldWithPath("content.[].relatedItemId").type(JsonFieldType.NUMBER).description("영양제 ID"),
                                fieldWithPath("content.[].name").type(JsonFieldType.STRING).description("영양제 이름"),
                                fieldWithPath("content.[].reviewContent").type(JsonFieldType.STRING).description("영양제 리뷰"),
                                fieldWithPath("content.[].rating").type(JsonFieldType.NUMBER).description("영양제 평점"),
                                fieldWithPath("content.[].img").type(JsonFieldType.STRING).description("영양제 이미지"),
                                fieldWithPath("pageable").type(JsonFieldType.OBJECT).description("페이지 관련 정보"),
                                fieldWithPath("pageable.sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬 여부"),
                                fieldWithPath("pageable.sort.unsorted").type(JsonFieldType.BOOLEAN).description("비정렬 여부"),
                                fieldWithPath("pageable.sort.empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부"),
                                fieldWithPath("pageable.offset").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("pageable.pageNumber").type(JsonFieldType.NUMBER).description("현재 페이지 번호"),
                                fieldWithPath("pageable.pageSize").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("pageable.paged").type(JsonFieldType.BOOLEAN).description("페이징 여부"),
                                fieldWithPath("pageable.unpaged").type(JsonFieldType.BOOLEAN).description("비페이징 여부"),
                                fieldWithPath("last").type(JsonFieldType.BOOLEAN).description("마지막 페이지 여부"),
                                fieldWithPath("totalPages").type(JsonFieldType.NUMBER).description("총 페이지 크기"),
                                fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("총 요소 크기"),
                                fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("number").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                fieldWithPath("sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬여부"),
                                fieldWithPath("sort.unsorted").type(JsonFieldType.BOOLEAN).description("비정렬여부"),
                                fieldWithPath("sort.empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부"),
                                fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("현재 페이지 크기"),
                                fieldWithPath("first").type(JsonFieldType.BOOLEAN).description("처음 페이지 여부"),
                                fieldWithPath("empty").type(JsonFieldType.BOOLEAN).description("값이 비었는지 여부")
                        )));

        // then
        then(userService).should(times(1)).findReviewPillByUser(any(), any());
    }

    @Test
    @DisplayName("해당 영양제에 대한 나의 정보 조회")
    void findByPillId() throws Exception {
        // given
        given(userService.findByPill(any(), anyInt()))
                .willReturn(TEST_USER_PILL_INFO_RESPONSE);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/users/pill/{pill_id}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_USER_PILL_INFO_RESPONSE)))
                .andDo(document("api/users/pill/{pill_id}",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("pill_id").description("영양제 ID")
                        ),
                        responseFields(
                                fieldWithPath("pillTaking").type(JsonFieldType.STRING).description("운동중 여부"),
                                fieldWithPath("pillBookmark").type(JsonFieldType.STRING).description("복용중 여부")
                        )));

        // then
        then(userService).should(times(1)).findByPill(any(), anyInt());
    }

    @Test
    @DisplayName("나의 운동목적 & 운동횟수 수정")
    void updateUserExercise() throws Exception {
        // given
        willDoNothing()
                .given(userService)
                .updateUserExercise(any(), any());

        // when
        mockMvc.perform(put("/api/users/exercise")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_UPDATE_USER_EXERCISE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/users/exercise/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        requestFields(
                                fieldWithPath("exercisePurposeId").type(JsonFieldType.NUMBER).description("운동목적 ID"),
                                fieldWithPath("exerciseTimes").type(JsonFieldType.NUMBER).description("운동횟수 ID")
                        )));

        // then
        then(userService).should(times(1)).updateUserExercise(any(), any());
    }

    @Test
    @DisplayName("나의 인바디정보 등록 & 수정")
    void updateUserInbody() throws Exception {
        // given
        willDoNothing()
                .given(userService)
                .updateUserInbody(any(), any());

        // when
        mockMvc.perform(put("/api/users/inbody")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_UPDATE_USER_INBODY_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/users/inbody",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        requestFields(
                                fieldWithPath("userProfileHeight").type(JsonFieldType.NUMBER).description("신장"),
                                fieldWithPath("userProfileWeight").type(JsonFieldType.NUMBER).description("체중"),
                                fieldWithPath("userProfileFat").type(JsonFieldType.NUMBER).description("체지방량"),
                                fieldWithPath("userProfileSkeleton").type(JsonFieldType.NUMBER).description("골격근량"),
                                fieldWithPath("userProfileWater").type(JsonFieldType.NUMBER).description("체수분량")
                        )));

        // then
        then(userService).should(times(1)).updateUserInbody(any(), any());
    }

    @Test
    @DisplayName("회원 로그아웃")
    void logout() throws Exception {
        // given
        willDoNothing()
                .given(userService)
                .logout(any());

        // when
        mockMvc.perform(post("/api/users/logout")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/users/logout",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        )));

        // then
        then(userService).should(times(1)).logout(any());
    }

    @Test
    @DisplayName("회원 탈퇴")
    void deleteUser() throws Exception {
        // given
        willDoNothing()
                .given(userService)
                .deleteUser(any());

        // when
        mockMvc.perform(delete("/api/users")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/users",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        )));

        // then
        then(userService).should(times(1)).deleteUser(any());
    }
}