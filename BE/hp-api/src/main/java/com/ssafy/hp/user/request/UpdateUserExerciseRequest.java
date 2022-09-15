package com.ssafy.hp.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserExerciseRequest {
    private int exercisePurposeId;

    private int exerciseTimes;
}
