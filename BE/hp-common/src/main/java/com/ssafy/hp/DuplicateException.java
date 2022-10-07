package com.ssafy.hp;

public class DuplicateException extends RuntimeException{
    public static final String USER_DUPLICATE = "이미 등록된 회원정보입니다.";
    public static final String CALENDAR_DUPLICATE = "이미 등록된 일정입니다.";
    public static final String REVIEW_DUPLICATE = "이미 해당 영양제에 등록된 리뷰가 존재합니다.";
    public DuplicateException(String message) {
        super(message);
    }
}
