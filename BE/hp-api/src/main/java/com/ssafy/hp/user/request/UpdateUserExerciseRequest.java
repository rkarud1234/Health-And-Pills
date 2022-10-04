package com.ssafy.hp.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserExerciseRequest {
    @Positive(message = "운동목적은 양수이어야 합니다.")
    @Min(value = 1, message = "1~4까지 허용됩니다.")
    @Max(value = 4, message = "1~4까지 허용됩니다.")
    private int exercisePurposeId;

    @NotNull(message = "운동횟수는 필수값입니다.")
    @Positive(message = "운동횟수는 양수이어야 합니다.")
    @Min(value = 1, message = "1~4까지 허용됩니다.")
    @Max(value = 4, message = "1~4까지 허용됩니다.")
    private int exerciseTimes;
}
