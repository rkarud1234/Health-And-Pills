package com.ssafy.hp.user.service;

import com.ssafy.hp.DuplicateException;
import com.ssafy.hp.NotFoundException;
import com.ssafy.hp.auth.AuthRepository;
import com.ssafy.hp.auth.domain.Auth;
import com.ssafy.hp.exercise.ExerciseRepository;
import com.ssafy.hp.exercise.domain.Exercise;
import com.ssafy.hp.pill.PillRepository;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.user.*;
import com.ssafy.hp.user.domain.*;
import com.ssafy.hp.user.query.UserQueryRepository;
import com.ssafy.hp.user.request.CreateUserProfileRequest;
import com.ssafy.hp.user.request.UpdateUserExerciseRequest;
import com.ssafy.hp.user.request.UpdateUserInbodyRequest;
import com.ssafy.hp.user.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

import static com.ssafy.hp.DuplicateException.USER_DUPLICATE;
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


    @Transactional
    @Override
    public void createFcmToken(User user, String fcmToken) {
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        findUser.updateFcmToken(fcmToken);
    }

    @Transactional
    @Override
    public void createUserProfile(User user, CreateUserProfileRequest request) {
        if (userProfileRepository.existsById(user.getUserId())) {
            throw new DuplicateException(USER_DUPLICATE);
        }
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        ExercisePurpose findExerciserPurpose = exercisePurposeRepository.findById(request.getExercisePurposeId())
                .orElseThrow(() -> new NotFoundException(EXERCISE_NOT_FOUND));

        UserProfile userProfile = UserProfile.createUserProfile(findUser, findUser.getUserNickname(), request.getUserProfileBirthday(), request.getUserProfileGender(), request.getExerciseTimes(), findExerciserPurpose);
        userProfileRepository.save(userProfile);
    }

    // 회원정보 조회
    @Override
    public UserInfoResponse findUser(User user) {
        if (!userProfileRepository.existsById(user.getUserId())) {
            return null;
        }
        UserProfile findUserProfile = userProfileRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return UserInfoResponse.from(findUserProfile);
    }

    @Override
    public Page<UserExerciseResponse> findTakingExerciseByUserId(User user, Pageable pageable) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        return userQueryRepository.findTakingExerciseByUserId(user, pageable).map(UserExerciseResponse::from);
    }

    @Override
    public Page<UserExerciseResponse> findBookmarkExerciseByUserId(User user, Pageable pageable) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        return userQueryRepository.findBookmarkExerciseByUserId(user, pageable).map(UserExerciseResponse::from);
    }

    @Override
    public Page<UserExerciseResponse> findLikeExerciseByUserId(User user, Pageable pageable) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return userQueryRepository.findLikeExerciseByUserId(user, pageable).map(UserExerciseResponse::from);
    }

    @Override
    public UserExerciseInfoResponse findByExerciseId(User user, int exerciseId) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Exercise findExercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new NotFoundException(EXERCISE_NOT_FOUND));
        Optional<UserExercise> findUserExercise = userExerciseRepository.findUserExerciseByUsersAndExercise(user, findExercise);

        if (findUserExercise.isEmpty()) {
            findUserExercise = Optional.of(UserExercise.createUserExercise(user, findExercise));
        }

        return UserExerciseInfoResponse.from(findUserExercise.get());
    }

    @Override
    public Page<UserPillResponse> findTakingPillByUserId(User user, Pageable pageable) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        return userQueryRepository.findTakingPillByUserId(user, pageable).map(UserPillResponse::from);
    }

    @Override
    public Page<UserPillResponse> findBookmarkPillByUserId(User user, Pageable pageable) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        return userQueryRepository.findBookmarkPillByUserId(user, pageable).map(UserPillResponse::from);
    }

    @Override
    public Page<UserReviewPillResponse> findReviewPillByUserId(User user, Pageable pageable) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return userQueryRepository.findReviewPillByUserId(user, pageable).map(UserReviewPillResponse::from);
    }

    @Override
    public UserPillInfoResponse findByPillId(User user, int pillId) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Pill findPill = pillRepository.findById(pillId)
                .orElseThrow(() -> new NotFoundException(PILL_NOT_FOUND));
        Optional<UserPill> findUserPill = userPillRepository.findUserPillByUsersAndPill(user, findPill);

        if (findUserPill.isEmpty()) {
            findUserPill = Optional.of(UserPill.createUserPill(user, findPill));
        }

        return UserPillInfoResponse.from(findUserPill.get());
    }

    @Transactional
    @Override
    public void updateUserExercise(User user, UpdateUserExerciseRequest request) {
        UserProfile findUserProfile = userProfileRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        ExercisePurpose findExercisePurpose = exercisePurposeRepository.findById(request.getExercisePurposeId())
                .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND));

        findUserProfile.updateUserExercise(findExercisePurpose, request.getExerciseTimes());
    }

    @Transactional
    @Override
    public void updateUserInbody(User user, UpdateUserInbodyRequest request) {
        UserProfile findUserProfile = userProfileRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        findUserProfile.updateUserInbody(request.getUserProfileHeight(), request.getUserProfileWeight(), request.getUserProfileFat(), request.getUserProfileSkeleton(), request.getUserProfileWater());
    }

    @Override
    public void logout(User user) {
        Auth findAuth = authRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(AUTH_NOT_FOUND));

        authRepository.delete(findAuth);
    }

    @Transactional
    @Override
    public void deleteUser(User user) {
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        userRepository.delete(findUser);
    }
}
