package com.ssafy.hp.security.filter;

import com.ssafy.hp.security.service.UserDetailService;
import com.ssafy.hp.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import org.springframework.stereotype.Component;

import javax.servlet.http.*;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailService userDetailService;

//    @Override
//    public void doFilter(ServletRequest request,
//                         ServletResponse response,
//                         FilterChain chain) throws IOException, ServletException {
//
//        String jwtToken = extractToken((HttpServletRequest) request);
//
//        if (StringUtils.hasText(jwtToken) && jwtUtil.isValidToken(jwtToken)) {
//            UserDetails userDetails = userDetailService.loadUserByUsername(jwtUtil.getSubject(jwtToken));
//
//            Authentication authentication =
//                    new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, userDetails.getAuthorities());
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        }
//        chain.doFilter(request, response);
//    }
    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletResponse res = (HttpServletResponse) response;
        HttpServletRequest req = (HttpServletRequest) request;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");     //허용할 request http METHOD : POST, GET, DELETE, PUT
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,observe");

        String jwtToken = extractToken((HttpServletRequest) req);

        if (StringUtils.hasText(jwtToken) && jwtUtil.isValidToken(jwtToken)) {
            UserDetails userDetails = userDetailService.loadUserByUsername(jwtUtil.getSubject(jwtToken));

            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        if(req.getMethod().equals(HttpMethod.OPTIONS.name())){
            res.setStatus(HttpStatus.OK.value());
        }else{
            chain.doFilter(req, res);
        }
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}