package com.ssafy.hp.user.service;

import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.request.UpdateUserExerciseRequest;
import com.ssafy.hp.user.request.UpdateUserInbodyRequest;
import com.ssafy.hp.user.response.UserExerciseResponse;
import com.ssafy.hp.user.response.UserInfoResponse;
import com.ssafy.hp.user.response.UserPillResponse;
import com.ssafy.hp.user.response.UserReviewPillResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    //내정보 조회
    UserInfoResponse findUser(int userId);

    // 타회원 정보 조회

    // 나의 운동중 운동리스트 조회
    Page<UserExerciseResponse> findTakingExerciseByUserId(User user, Pageable pageable);

    // 북마크 운동리스트 조회
    Page<UserExerciseResponse> findBookmarkExerciseByUserId(User user, Pageable pageable);

    // 좋아요 운동리스트 조회
    Page<UserExerciseResponse> findLikeExerciseByUserId(User user, Pageable pageable);

    // 나의 복용중 영양제리스트 조회
    Page<UserPillResponse> findTakingPillByUserId(User user, Pageable pageable);

    // 북마크 영양제리스트 조회
    Page<UserPillResponse> findBookmarkPillByUserId(User user, Pageable pageable);

    // 평점 영양제리스트 조회
    Page<UserReviewPillResponse> findReviewPillByUserId(User user, Pageable pageable);

    // 운동 목적 & 운동 횟수 수정
    void updateUserExercise(int userId, UpdateUserExerciseRequest request);

    // 인바디 수정
    void updateUserInbody(int userId, UpdateUserInbodyRequest request);

    // 로그아웃
    void logout(int userId);

    // 회원 탈퇴
    void deleteUser(int userId);
}
