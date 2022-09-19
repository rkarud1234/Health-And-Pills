package com.ssafy.hp.user.service;

import com.ssafy.hp.NotFoundException;
import com.ssafy.hp.auth.AuthRepository;
import com.ssafy.hp.auth.domain.Auth;
import com.ssafy.hp.exercise.ExerciseRepository;
import com.ssafy.hp.exercise.domain.Exercise;
import com.ssafy.hp.pill.PillRepository;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.pill.domain.PillReview;
import com.ssafy.hp.user.*;
import com.ssafy.hp.user.domain.*;
import com.ssafy.hp.user.query.UserQueryRepository;
import com.ssafy.hp.user.request.UpdateUserExerciseRequest;
import com.ssafy.hp.user.request.UpdateUserInbodyRequest;
import com.ssafy.hp.user.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static com.ssafy.hp.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {
    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final ExercisePurposeRepository exercisePurposeRepository;
    private final UserQueryRepository userQueryRepository;
    private final ExerciseRepository exerciseRepository;
    private final PillRepository pillRepository;
    private final UserExerciseRepository userExerciseRepository;
    private final UserPillRepository userPillRepository;


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
    public UserExerciseInfoResponse findByExerciseId(User user, int exerciseId) {
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Exercise findExercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new NotFoundException(EXERCISE_NOT_FOUND));
        UserExercise findUserExercise = userExerciseRepository.findUserExerciseByUsersAndExercise(findUser, findExercise)
                .orElseThrow(() -> new NotFoundException(EXERCISE_NOT_FOUND));

        return UserExerciseInfoResponse.from(findUserExercise);
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

    @Override
    public UserPillInfoResponse findByPillId(User user, int pillId) {
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Pill findPill = pillRepository.findById(pillId)
                .orElseThrow(() -> new NotFoundException(PILL_NOT_FOUND));
        UserPill findUserPill = userPillRepository.findUserPillByUsersAndPill(findUser, findPill)
                .orElseThrow(() -> new NotFoundException(PILL_NOT_FOUND));
        return UserPillInfoResponse.from(findUserPill);
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
