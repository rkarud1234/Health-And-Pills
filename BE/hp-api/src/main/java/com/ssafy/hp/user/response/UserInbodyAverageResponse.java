package com.ssafy.hp.user.response;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.hp.user.domain.UserProfile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInbodyAverageResponse {
    private double userProfileHeight;

    private double userProfileWeight;

    private double userProfileFat;

    private double userProfileSkeleton;

    private double userProfileWater;

    @QueryProjection
    public UserInbodyAverageResponse(double userProfileHeight, double userProfileWeight, double userProfileFat, double userProfileSkeleton, double userProfileWater) {
        this.userProfileHeight = userProfileHeight;
        this.userProfileWeight = userProfileWeight;
        this.userProfileFat = userProfileFat;
        this.userProfileSkeleton = userProfileSkeleton;
        this.userProfileWater = userProfileWater;
    }
}
