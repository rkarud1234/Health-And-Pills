package com.ssafy.hp.user.service;

import com.ssafy.hp.user.request.UpdateUserExerciseRequest;
import com.ssafy.hp.user.request.UpdateUserInbodyRequest;
import com.ssafy.hp.user.response.UserExerciseResponse;
import com.ssafy.hp.user.response.UserInfoResponse;
import com.ssafy.hp.user.response.UserPillResponse;
import com.ssafy.hp.user.response.UserReviewResponse;

import java.util.List;

public interface UserService {
    //내정보 조회
    UserInfoResponse findUser(int userId);

    // 타회원 정보 조회

    //나의 운동정보 리스트 조회
    List<UserExerciseResponse> findExerciseByUserId(int userId);


    // 나의 영양제 정보 리스트 조회
    List<UserPillResponse> findPillByUserId(int userId);

    // 나의 리뷰 리스트 조회
    List<UserReviewResponse> findReviewByUserId(int userId);

    // 운동 목적 & 운동 횟수 수정
    void updateUserExercise(int userId, UpdateUserExerciseRequest request);

    // 인바디 수정
    void updateUserInbody(int userId, UpdateUserInbodyRequest request);

    // 로그아웃
    void logout(int userId);

    // 회원 탈퇴
    void deleteUser(int userId);
}
