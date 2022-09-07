package com.ssafy.hp.auth.service;

import com.ssafy.hp.auth.response.TokenResponse;

public interface AuthService {

    TokenResponse login(String kakaoToken, String fcmToken);

    TokenResponse generateAccessToken(Long userId, String refreshToken);
}