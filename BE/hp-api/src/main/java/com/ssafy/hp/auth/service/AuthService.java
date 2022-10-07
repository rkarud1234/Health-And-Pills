package com.ssafy.hp.auth.service;

import com.ssafy.hp.auth.response.TokenResponse;

public interface AuthService {

    TokenResponse generateToken(int userId);

    TokenResponse regenerateAccessToken(int userId, String refreshToken);
}