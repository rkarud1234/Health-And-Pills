package com.ssafy.hp;

public class CountOutOfBoundsException extends RuntimeException {
    public static final String CALENDAR_OUT_OF_BOUNDS = "일정의 최대등록 범위를 초과했습니다.";

    public CountOutOfBoundsException(String message) {
        super(message);
    }
}