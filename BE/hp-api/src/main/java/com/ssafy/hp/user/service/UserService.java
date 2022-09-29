package com.ssafy.hp.user.service;

import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.request.CreateUserProfileRequest;
import com.ssafy.hp.user.request.UpdateUserExerciseRequest;
import com.ssafy.hp.user.request.UpdateUserInbodyRequest;
import com.ssafy.hp.user.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    //fcm 토큰 받기
    void createFcmToken(User user, String fcmToken);

    // 필수정보 등록
    void createUserProfile(User user, CreateUserProfileRequest request);

    //내정보 조회
    UserInfoResponse findUser(User user);

    // 타회원 정보 조회

    // 나의 운동중 운동리스트 조회
    Page<UserExerciseResponse> findTakingExerciseByUserId(User user, Pageable pageable);

    // 북마크 운동리스트 조회
    Page<UserExerciseResponse> findBookmarkExerciseByUserId(User user, Pageable pageable);

    // 좋아요 운동리스트 조회
    Page<UserExerciseResponse> findLikeExerciseByUserId(User user, Pageable pageable);

    // 해당운동에 대한 나의 정보 조회
    UserExerciseInfoResponse findByExerciseId(User user, int exerciseId);

    // 나의 복용중 영양제리스트 조회
    Page<UserPillResponse> findTakingPillByUserId(User user, Pageable pageable);

    // 북마크 영양제리스트 조회
    Page<UserPillResponse> findBookmarkPillByUserId(User user, Pageable pageable);

    // 평점 영양제리스트 조회
    Page<UserReviewPillResponse> findReviewPillByUserId(User user, Pageable pageable);

    // 해당영양제에 대한 나의 정보 조회
    UserPillInfoResponse findByPillId(User user, int pillId);

    // 운동 목적 & 운동 횟수 수정
    void updateUserExercise(User user, UpdateUserExerciseRequest request);

    // 인바디 수정
    void updateUserInbody(User user, UpdateUserInbodyRequest request);

    UserInbodyAverageResponse findUserInbodyAverage(User user);

    // 로그아웃
    void logout(User user);

    // 회원 탈퇴
    void deleteUser(User user);
}
