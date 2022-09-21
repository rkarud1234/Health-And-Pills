package com.ssafy.hp;

public class NotFoundException extends RuntimeException {
    public static final String USER_NOT_FOUND = "존재하지 않는 회원입니다.";
    public static final String AUTH_NOT_FOUND = "존재하지 않는 토큰입니다.";
    public static final String CATEGORY_NOT_FOUND = "존재하지 않는 분류입니다.";
    public static final String EXERCISE_NOT_FOUND = "존재하지 않는 운동입니다.";
    public static final String PILL_NOT_FOUND = "존재하지 않는 영양제입니다.";
    public static final String REVIEW_NOT_FOUND = "존재하지 않는 리뷰입니다.";
    public NotFoundException(String message) {
        super(message);
    }
}