package com.ssafy.hp.user.controller;

import com.ssafy.hp.config.LoginUserArgumentResolver;
import com.ssafy.hp.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@AutoConfigureRestDocs // RestDocs 자동 설정
@ExtendWith(RestDocumentationExtension.class) // RestDocs 확장
@WebMvcTest(UserController.class)
class UserControllerTest {
    @MockBean
    private UserService userService;

    @MockBean
    private LoginUserArgumentResolver loginUserArgumentResolver;

    private MockMvc mockMvc;

    // MockMvc 생성때 추가
    @BeforeEach
    public void setup(WebApplicationContext wac,
                      RestDocumentationContextProvider restDocumentationContextProvider) {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(wac)
                .alwaysDo(print())
                .addFilters(new CharacterEncodingFilter("utf-8", true))
                .apply(documentationConfiguration(restDocumentationContextProvider)
                        .operationPreprocessors()
                        .withRequestDefaults(prettyPrint())
                        .withResponseDefaults(prettyPrint()))
                .build();
    }

    @Test
    void createUserProfile() {
    }

    @Test
    void findUser() {
    }

    @Test
    void findById() {
    }

    @Test
    void findTakingExerciseByUserId() {
    }

    @Test
    void findBookmarkExerciseByUserId() {
    }

    @Test
    void findLikeExerciseByUserId() {
    }

    @Test
    void findByExerciseId() {
    }

    @Test
    void findTakingPillByUserId() {
    }

    @Test
    void findBookmarkPillByUserId() {
    }

    @Test
    void findReviewPillByUserId() {
    }

    @Test
    void findByPillId() {
    }

    @Test
    void updateUserExercise() {
    }

    @Test
    void updateUserInbody() {
    }

    @Test
    void logout() {
    }

    @DeleteMapping
    @Test
    void deleteUser() {
    }
}