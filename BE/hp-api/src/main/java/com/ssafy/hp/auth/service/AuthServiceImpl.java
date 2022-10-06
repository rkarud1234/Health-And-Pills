package com.ssafy.hp.auth.service;

import com.ssafy.hp.NotFoundException;
import com.ssafy.hp.NotMatchException;
import com.ssafy.hp.auth.AuthRepository;
import com.ssafy.hp.auth.domain.Auth;
import com.ssafy.hp.auth.response.TokenResponse;
import com.ssafy.hp.security.util.JwtUtil;
import com.ssafy.hp.user.UserRepository;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import static com.ssafy.hp.NotFoundException.AUTH_NOT_FOUND;
import static com.ssafy.hp.NotFoundException.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final JwtUtil jwtUtil;
    private final AuthRepository authRepository;
    private final UserRepository userRepository;

    @Value("${token.access_token.expiration_time}")
    private String accessTokenExpirationTime;
    @Value("${token.refresh_token.expiration_time}")
    private String refreshTokenExpirationTime;
    @Value("${token.refresh_token.expiration_date}")
    private Long refreshTokenExpirationDate;


    //토큰 발급
    @Override
    public TokenResponse generateToken(int userId) {
        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        String accessToken = jwtUtil.createToken(findUser.getUserId(), String.valueOf(findUser.getRole()), accessTokenExpirationTime);
        String refreshToken = jwtUtil.createToken(findUser.getUserId(), String.valueOf(findUser.getRole()), refreshTokenExpirationTime);
        Auth auth = Auth.createAuth(findUser.getUserId(), refreshToken, refreshTokenExpirationDate);
        authRepository.save(auth);
        return new TokenResponse(accessToken, refreshToken);
    }

    //토큰 재발급
    @Override
    public TokenResponse regenerateAccessToken(int userId, String refreshToken) {
        Auth findAuth = authRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(AUTH_NOT_FOUND));

        if (!refreshToken.equals(findAuth.getRefreshToken())) {
            throw new NotMatchException("Refresh Token이 일치하지 않습니다.");
        }

        String accessToken = jwtUtil.createToken(refreshToken, accessTokenExpirationTime);

        //남아있는 시간이 7일 미만이라면
        if (findAuth.getExpiration() < 7) {
            refreshToken = jwtUtil.createToken(refreshToken, refreshTokenExpirationTime);

            Auth auth = Auth.createAuth(userId, refreshToken, refreshTokenExpirationDate);
            authRepository.save(auth);
        }
        return new TokenResponse(accessToken, refreshToken);
    }
}
