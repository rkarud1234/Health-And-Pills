package com.ssafy.hp.auth.controller;

import com.ssafy.hp.auth.response.TokenResponse;
import com.ssafy.hp.auth.service.AuthService;
import com.ssafy.hp.config.LoginUser;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    //토큰 재발급
    @PostMapping("/refresh")
    public ResponseEntity generateAccessToken(@LoginUser User user, @RequestHeader("Authorization") String refreshToken){
        TokenResponse token = authService.generateAccessToken(user.getUserId(), refreshToken.substring(7));

        return ResponseEntity.status(HttpStatus.OK)
                .header("accessToken", token.getAccessToken())
                .header("refreshToken", token.getRefreshToken())
                .build();

    }
}
