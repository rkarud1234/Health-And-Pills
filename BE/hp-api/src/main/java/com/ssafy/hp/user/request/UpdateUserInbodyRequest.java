package com.ssafy.hp.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserInbodyRequest {
    @NotNull(message = "신장을 입력해주세요.")
    @Positive(message = "신장은 양수이어야 합니다.")
    private double userProfileHeight;

    @NotNull(message = "체중을 입력해주세요.")
    @Positive(message = "체중은 양수이어야 합니다.")
    private double userProfileWeight;

    @NotNull(message = "체지방량을 입력해주세요.")
    @Positive(message = "체지방량은 양수이어야 합니다.")
    private double userProfileFat;

    @NotNull(message = "골격근량을 입력해주세요.")
    @Positive(message = "골격근량은 양수이어야 합니다.")
    private double userProfileSkeleton;

    @NotNull(message = "체수분량을 입력해주세요.")
    @Positive(message = "체수분량은 양수이어야 합니다.")
    private double userProfileWater;
}
