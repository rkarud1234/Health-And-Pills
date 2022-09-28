package com.ssafy.hp.user.response;

import com.ssafy.hp.user.domain.UserProfile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInbodyAverageResponse {
    private double userProfileHeight;

    private double userProfileWeight;

    private double userProfileFat;

    private double userProfileSkeleton;

    private double userProfileWater;

    public static UserInbodyAverageResponse from(double userProfileHeight, double userProfileWeight, double userProfileFat, double userProfileSkeleton, double userProfileWater){
        UserInbodyAverageResponse userInbodyAverageResponse = new UserInbodyAverageResponse();
        userInbodyAverageResponse.userProfileHeight = userProfileHeight;
        userInbodyAverageResponse.userProfileWeight = userProfileWeight;
        userInbodyAverageResponse.userProfileFat = userProfileFat;
        userInbodyAverageResponse.userProfileSkeleton = userProfileSkeleton;
        userInbodyAverageResponse.userProfileWater = userProfileWater;
        return userInbodyAverageResponse;
    }
}
