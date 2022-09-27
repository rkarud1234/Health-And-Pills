package com.ssafy.hp.user;

import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.domain.type.Provider;
import com.ssafy.hp.user.domain.type.Role;
import com.ssafy.hp.user.request.CreateUserProfileRequest;
import com.ssafy.hp.user.request.UpdateUserExerciseRequest;
import com.ssafy.hp.user.request.UpdateUserInbodyRequest;
import com.ssafy.hp.user.response.*;

import java.util.Arrays;
import java.util.List;

public class UserFixture {
    public static final int ID = 1;
    public static final String NAME = "이름";
    public static final List<String> TYPE = Arrays.asList("부위1", "부위2", "부위3", "부위4");
    public static final String YN_FIELD = "Y";
    public static final double RATING = 4.5;
    public static final String IMG = "이미지url";
    public static final String CONTENT = "내용";
    public static final String USER_PROFILE_NICKNAME = "한싸피";
    public static final String USER_PROFILE_BIRTHDAY = "220922";
    public static final String USER_PROFILE_GENDER = "male";
    public static final int EXERCISE_ID = 1;
    public static final double USER_PROFILE_HEIGHT = 700;
    public static final double USER_PROFILE_WEIGHT = 70;
    public static final double USER_PROFILE_FAT = 77;
    public static final double USER_PROFILE_SKELETON = 77;
    public static final double USER_PROFILE_WATER = 77;

    public static final UserInfoResponse TEST_USER_INFO_RESPONSE
            = new UserInfoResponse(USER_PROFILE_NICKNAME,USER_PROFILE_BIRTHDAY,USER_PROFILE_GENDER, EXERCISE_ID, EXERCISE_ID, USER_PROFILE_HEIGHT, USER_PROFILE_WEIGHT, USER_PROFILE_FAT, USER_PROFILE_SKELETON, USER_PROFILE_WATER);
    public static final UserExerciseResponse TEST_USER_EXERCISE_RESPONSE
            = new UserExerciseResponse(ID, ID, NAME, TYPE);
    public static final UserExerciseInfoResponse TEST_USER_EXERCISE_INFO_RESPONSE
            = new UserExerciseInfoResponse(YN_FIELD, YN_FIELD, YN_FIELD);
    public static final UserPillResponse TEST_USER_PILL_RESPONSE
            = new UserPillResponse(ID, ID, NAME, RATING, IMG);
    public static final UserReviewPillResponse TEST_USER_REVIEW_PILL_RESPONSE
            = new UserReviewPillResponse(ID, ID, NAME, IMG, CONTENT, RATING);
    public static final UserPillInfoResponse TEST_USER_PILL_INFO_RESPONSE
            = new UserPillInfoResponse(YN_FIELD, YN_FIELD);

    public static final CreateUserProfileRequest TEST_CREATE_USER_PROFILE_REQUEST
            = new CreateUserProfileRequest(USER_PROFILE_BIRTHDAY, USER_PROFILE_GENDER, EXERCISE_ID, EXERCISE_ID);
    public static final UpdateUserExerciseRequest TEST_UPDATE_USER_EXERCISE_REQUEST
            = new UpdateUserExerciseRequest(EXERCISE_ID, EXERCISE_ID);
    public static final UpdateUserInbodyRequest TEST_UPDATE_USER_INBODY_REQUEST
            = new UpdateUserInbodyRequest(USER_PROFILE_HEIGHT, USER_PROFILE_WEIGHT, USER_PROFILE_FAT, USER_PROFILE_SKELETON, USER_PROFILE_WATER);
}
