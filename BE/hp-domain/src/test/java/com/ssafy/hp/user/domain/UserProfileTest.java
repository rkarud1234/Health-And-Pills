package com.ssafy.hp.user.domain;


import com.ssafy.hp.user.domain.type.Provider;
import com.ssafy.hp.user.domain.type.Role;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class UserProfileTest {
    public static final User user = User.createUser(Provider.google, "109764055816357512970", "google_109764055816357512970", Role.ROLE_USER, "한싸피");
    public static final String userProfileNickname = "한싸피";
    public static final String userProfileBirthday = "220922";
    public static final String userProfileGender = "male";
    public static final int exerciseTimes = 1;
    public static final ExercisePurpose exercisePurpose = null;
    public static final double userProfileHeight = 700;
    public static final double userProfileWeight = 70;
    public static final double userProfileFat = 77;
    public static final double userProfileSkeleton = 77;
    public static final double userProfileWater = 77;

    @Test
    @DisplayName("회원의 프로필을 생성한다.")
    void createUserProfile() {
        //given

        //when
        UserProfile result = UserProfile.createUserProfile(user, userProfileNickname, userProfileBirthday, userProfileGender, exerciseTimes, exercisePurpose);


        //then
        assertThat(result.getUsers()).isEqualTo(user);
        assertThat(result.getUserProfileNickname()).isEqualTo(userProfileNickname);
        assertThat(result.getUserProfileBirthday()).isEqualTo(userProfileBirthday);
        assertThat(result.getUserProfileGender()).isEqualTo(userProfileGender);
        assertThat(result.getExerciseTimes()).isEqualTo(exerciseTimes);
        assertThat(result.getExercisePurpose()).isEqualTo(exercisePurpose);
    }

    @Test
    @DisplayName("회원의 운동목적과 운동횟수를 생성한다.")
    void updateUserExercise() {
        //given
        UserProfile result = UserProfile.createUserProfile(user, userProfileNickname, userProfileBirthday, userProfileGender, exerciseTimes, exercisePurpose);


        //when
        result.updateUserExercise(exercisePurpose, exerciseTimes);

        //then
        assertThat(result.getExercisePurpose()).isEqualTo(null);
    }

    @Test
    @DisplayName("회원의 인바디 정보를 생성한다.")
    void updateUserInbody() {
        //given
        UserProfile result = UserProfile.createUserProfile(user, userProfileNickname, userProfileBirthday, userProfileGender, exerciseTimes, exercisePurpose);

        //when
        result.updateUserInbody(userProfileHeight, userProfileWeight, userProfileFat, userProfileSkeleton, userProfileWater);

        //then
        assertThat(result.getUserProfileHeight()).isEqualTo(userProfileHeight);
        assertThat(result.getUserProfileWeight()).isEqualTo(userProfileWeight);
        assertThat(result.getUserProfileFat()).isEqualTo(userProfileFat);
        assertThat(result.getUserProfileSkeleton()).isEqualTo(userProfileSkeleton);
        assertThat(result.getUserProfileWater()).isEqualTo(userProfileWater);
    }

}