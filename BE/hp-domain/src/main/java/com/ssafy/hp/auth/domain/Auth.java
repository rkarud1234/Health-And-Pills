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
    private int userId;

    private String refreshToken;

    @TimeToLive(unit = TimeUnit.DAYS)
    private Long expiration;

    public static Auth createAuth(int userId, String refreshToken, Long expiration){
        Auth auth = new Auth();
        auth.userId = userId;
        auth.refreshToken = refreshToken;
        auth.expiration = expiration;
        return auth;
    }

}