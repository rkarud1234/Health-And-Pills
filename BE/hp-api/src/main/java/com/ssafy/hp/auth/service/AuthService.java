package com.ssafy.hp.auth.service;

import com.ssafy.hp.auth.response.TokenResponse;

public interface AuthService {

    TokenResponse generateToken(int userId);

    TokenResponse generateAccessToken(int userId, String refreshToken);
}