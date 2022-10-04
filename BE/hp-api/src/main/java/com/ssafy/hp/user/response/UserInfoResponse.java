package com.ssafy.hp.user.response;

import com.ssafy.hp.user.domain.UserProfile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponse {
    private String userProfileNickname;

    private String userProfileBirthday;

    private String userProfileGender;

    private int exercisePurposeId;

    private int exerciseTimes;

    private double userProfileHeight;

    private double userProfileWeight;

    private double userProfileFat;

    private double userProfileSkeleton;

    private double userProfileWater;

    public static UserInfoResponse from(UserProfile userProfile){
        UserInfoResponse userInfoResponse = new UserInfoResponse();
        userInfoResponse.userProfileNickname = userProfile.getUserProfileNickname();
        userInfoResponse.userProfileBirthday = userProfile.getUserProfileBirthday();
        userInfoResponse.userProfileGender = userProfile.getUserProfileGender();
        userInfoResponse.exercisePurposeId = userProfile.getExercisePurpose().getExercisePurposeId();
        userInfoResponse.exerciseTimes = userProfile.getExerciseTimes();
        userInfoResponse.userProfileHeight = userProfile.getUserProfileHeight();
        userInfoResponse.userProfileWeight = userProfile.getUserProfileWeight();
        userInfoResponse.userProfileFat = userProfile.getUserProfileFat();
        userInfoResponse.userProfileSkeleton = userProfile.getUserProfileSkeleton();
        userInfoResponse.userProfileWater = userProfile.getUserProfileWater();
        return userInfoResponse;
    }


}
