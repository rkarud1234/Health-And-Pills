package com.ssafy.hp.security.handler;

import com.ssafy.hp.auth.response.TokenResponse;
import com.ssafy.hp.auth.service.AuthService;
import com.ssafy.hp.exercise.*;
import com.ssafy.hp.exercise.domain.*;
import com.ssafy.hp.security.oauth.CustomOAuth2User;
import com.ssafy.hp.security.util.*;
import lombok.*;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.*;
import org.springframework.security.core.context.*;
import org.springframework.security.web.authentication.*;
import org.springframework.stereotype.*;
import org.springframework.web.util.*;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

@RequiredArgsConstructor
@Component
public class OAuthAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final String AUTHENTICATION_REDIRECT_URI = "https://j7b203.p.ssafy.io/social/redirect";
    private final AuthService authService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        TokenResponse tokenResponse = authService.generateToken(customOAuth2User.getUserId());
        response.addHeader(HttpHeaders.AUTHORIZATION, tokenResponse.getAccessToken());
        response.addHeader("refreshToken", tokenResponse.getRefreshToken());

        String target = UriComponentsBuilder.fromUriString(AUTHENTICATION_REDIRECT_URI)
                .queryParam("accesstoken", tokenResponse.getAccessToken())
                .queryParam("refreshtoken", tokenResponse.getRefreshToken())
                .build().toString();

        getRedirectStrategy().sendRedirect(request, response, target);
    }
}