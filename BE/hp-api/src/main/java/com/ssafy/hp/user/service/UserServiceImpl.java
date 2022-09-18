package com.ssafy.hp.user.service;

import com.ssafy.hp.NotFoundException;
import com.ssafy.hp.auth.AuthRepository;
import com.ssafy.hp.auth.domain.Auth;
import com.ssafy.hp.pill.domain.PillReview;
import com.ssafy.hp.user.ExercisePurposeRepository;
import com.ssafy.hp.user.UserProfileRepository;
import com.ssafy.hp.user.UserRepository;
import com.ssafy.hp.user.domain.*;
import com.ssafy.hp.user.query.UserQueryRepository;
import com.ssafy.hp.user.request.UpdateUserExerciseRequest;
import com.ssafy.hp.user.request.UpdateUserInbodyRequest;
import com.ssafy.hp.user.response.UserExerciseResponse;
import com.ssafy.hp.user.response.UserInfoResponse;
import com.ssafy.hp.user.response.UserPillResponse;
import com.ssafy.hp.user.response.UserReviewPillResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.hp.NotFoundException.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final ExercisePurposeRepository exercisePurposeRepository;
    private final UserQueryRepository userQueryRepository;


    // 회원정보 조회
    @Override
    public UserInfoResponse findUser(int userId) {
        UserProfile findUserProfile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        return UserInfoResponse.from(findUserProfile);
    }

    @Override
    public Page<UserExerciseResponse> findTakingExerciseByUserId(User user, Pageable pageable) {
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Page<UserExercise> findExerciseList = userQueryRepository.findTakingExerciseByUserId(user, pageable);
        return findExerciseList.map(UserExerciseResponse::from);
    }

    @Override
    public Page<UserExerciseResponse> findBookmarkExerciseByUserId(User user, Pageable pageable) {
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Page<UserExercise> findExerciseList = userQueryRepository.findBookmarkExerciseByUserId(user, pageable);
        return findExerciseList.map(UserExerciseResponse::from);
    }

    @Override
    public Page<UserExerciseResponse> findLikeExerciseByUserId(User user, Pageable pageable) {
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Page<UserExercise> findExerciseList = userQueryRepository.findLikeExerciseByUserId(user, pageable);
        return findExerciseList.map(UserExerciseResponse::from);
    }

    @Override
    public Page<UserPillResponse> findTakingPillByUserId(User user, Pageable pageable) {
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Page<UserPill> findPillList = userQueryRepository.findTakingPillByUserId(user, pageable);
        return findPillList.map(UserPillResponse::from);
    }

    @Override
    public Page<UserPillResponse> findBookmarkPillByUserId(User user, Pageable pageable) {
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Page<UserPill> findPillList = userQueryRepository.findBookmarkPillByUserId(user, pageable);
        return findPillList.map(UserPillResponse::from);
    }

    @Override
    public Page<UserReviewPillResponse> findReviewPillByUserId(User user, Pageable pageable) {
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Page<PillReview> findPillList = userQueryRepository.findReviewPillByUserId(user, pageable);
        return findPillList.map(UserReviewPillResponse::from);
    }

    @Transactional
    @Override
    public void updateUserExercise(int userId, UpdateUserExerciseRequest request) {
        UserProfile findUserProfile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        ExercisePurpose findExercisePurpose = exercisePurposeRepository.findById(request.getExercisePurposeId())
                .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND));

        findUserProfile.updateUserExercise(findExercisePurpose, request.getExerciseTimes());
    }

    @Transactional
    @Override
    public void updateUserInbody(int userId, UpdateUserInbodyRequest request) {
        UserProfile findUserProfile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        findUserProfile.updateUserInbody(request.getUserProfileHeight(), request.getUserProfileWeight(), request.getUserProfileFat(), request.getUserProfileSkeleton(), request.getUserProfileWater());
    }

    @Override
    public void logout(int userId) {
        Auth findAuth = authRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(AUTH_NOT_FOUND));

        authRepository.delete(findAuth);
    }

    @Transactional
    @Override
    public void deleteUser(int userId) {
        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        userRepository.delete(findUser);
    }
}
