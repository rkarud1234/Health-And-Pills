package com.ssafy.hp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hp.auth.service.AuthService;
import com.ssafy.hp.config.LoginUserArgumentResolver;
import com.ssafy.hp.security.config.SecurityConfig;
import com.ssafy.hp.security.filter.JwtAuthenticationFilter;
import com.ssafy.hp.security.handler.CustomAccessDeniedHandler;
import com.ssafy.hp.security.handler.CustomAuthenticationEntryPoint;
import com.ssafy.hp.security.handler.OAuthAuthenticationSuccessHandler;
import com.ssafy.hp.security.service.OAuth2UserService;
import com.ssafy.hp.security.service.UserDetailService;
import com.ssafy.hp.security.util.JwtUtil;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.restdocs.RestDocumentationExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;


@AutoConfigureRestDocs // RestDocs 자동 설정
@ExtendWith(RestDocumentationExtension.class) // RestDocs로 확장
public abstract class ControllerTest {
    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean
    protected JwtUtil jwtUtil;

    @MockBean
    protected UserDetailService userDetailService;

    @MockBean
    protected LoginUserArgumentResolver loginUserArgumentResolver;

    @MockBean
    protected CustomAccessDeniedHandler accessDeniedHandler;

    @MockBean
    protected CustomAuthenticationEntryPoint authenticationEntryPoint;

    @MockBean
    protected OAuth2UserService oAuth2UserService;

    @MockBean
    protected OAuthAuthenticationSuccessHandler oAuthAuthenticationSuccessHandler;

    protected MockMvc mockMvc;

    // MockMvc 생성때 추가
    @BeforeEach
    void setUp(WebApplicationContext wac, RestDocumentationContextProvider restDocumentationContextProvider) {
        JwtAuthenticationFilter jwtAuthenticationFilter =  (JwtAuthenticationFilter) wac.getBean("jwtAuthenticationFilter");

        mockMvc = MockMvcBuilders
                .webAppContextSetup(wac)
                .alwaysDo(print())
                .addFilter(new CharacterEncodingFilter("UTF-8", true))
                .addFilter(jwtAuthenticationFilter)
                .apply(documentationConfiguration(restDocumentationContextProvider)
                        .operationPreprocessors()
                        .withRequestDefaults(prettyPrint())
                        .withResponseDefaults(prettyPrint()))
                .build();

    }
}
