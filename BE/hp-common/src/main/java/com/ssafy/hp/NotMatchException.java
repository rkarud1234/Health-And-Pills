package com.ssafy.hp;

public class NotMatchException extends RuntimeException {

    public static final String USER_NOT_MATCH = "존재하지 않는 회원입니다.";


    public NotMatchException(String message) {
        super(message);
    }
}