package com.ssafy.hp.auth.service;

import com.ssafy.hp.NotFoundException;
import com.ssafy.hp.NotMatchException;
import com.ssafy.hp.auth.AuthRepository;
import com.ssafy.hp.auth.domain.Auth;
import com.ssafy.hp.auth.response.TokenResponse;
import com.ssafy.hp.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import static com.ssafy.hp.NotFoundException.AUTH_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final JwtUtil jwtUtil;
    private final AuthRepository authRepository;

    @Value("${token.access_token.expiration_time}")
    private String accessTokenExpirationTime;
    @Value("${token.refresh_token.expiration_time}")
    private String refreshTokenExpirationTime;

    @Override
    public TokenResponse login(String kakaoToken, String fcmToken) {
        return null;
    }

    @Override
    public TokenResponse generateAccessToken(Long userId, String refreshToken) {
        Auth findAuth = authRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(AUTH_NOT_FOUND));

        if (!refreshToken.equals(findAuth.getRefreshToken())) {
            throw new NotMatchException("Refresh Token이 일치하지 않습니다.");
        }

        String accessToken = jwtUtil.createToken(refreshToken, accessTokenExpirationTime);

        String newRefreshToken = jwtUtil.createToken(refreshToken, refreshTokenExpirationTime);
        Auth auth = Auth.createAuth(userId, newRefreshToken);
        authRepository.save(auth);
        return new TokenResponse(accessToken, newRefreshToken);
    }
}
