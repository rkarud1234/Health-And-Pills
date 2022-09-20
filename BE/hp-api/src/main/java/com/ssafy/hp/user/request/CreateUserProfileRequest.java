package com.ssafy.hp.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserProfileRequest {
    @NotBlank(message = "생년월일은 필수값입니다.")
    private String userProfileBirthday;

    @NotBlank(message = "성별은 필수값입니다.")
    private String userProfileGender;

    private int exercisePurposeId;

    private int exerciseTimes;
}
