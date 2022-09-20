package com.ssafy.hp.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserProfileRequest {
    @NotBlank(message = "생년월일은 필수값입니다.")
    private String userProfileBirthday;

    @NotBlank(message = "성별은 필수값입니다.")
    private String userProfileGender;

    @NotNull(message = "운동목적은 필수값입니다.")
    @Positive(message = "운동목적은 양수이어야 합니다.")
    @Min(value = 1, message = "1~4까지 허용됩니다.")
    @Max(value = 4, message = "1~4까지 허용됩니다.")
    private Integer exercisePurposeId;

    @NotNull(message = "운동횟수는 필수값입니다.")
    @Positive(message = "운동횟수는 양수이어야 합니다.")
    @Min(value = 1, message = "1~4까지 허용됩니다.")
    @Max(value = 4, message = "1~4까지 허용됩니다.")
    private Integer exerciseTimes;
}
