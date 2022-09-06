package com.ssafy.hp.security.handler;

import com.ssafy.hp.security.util.*;
import lombok.*;
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
    private final String AUTHENTICATION_REDIRECT_URI = "http://127.0.0.1:5500/";
    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String target = UriComponentsBuilder.fromUriString(AUTHENTICATION_REDIRECT_URI)
                .build().toString();

        getRedirectStrategy().sendRedirect(request, response, target);
    }
}
