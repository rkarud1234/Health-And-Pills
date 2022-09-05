package com.ssafy.hp.auth.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.util.concurrent.TimeUnit;

@RedisHash("auth")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Auth {

    @Id
    private Long userId;

    private String refreshToken;

    public static Auth createAuth(Long userId, String refreshToken){
        Auth auth = new Auth();
        auth.userId = userId;
        auth.refreshToken = refreshToken;
        return auth;
    }

}