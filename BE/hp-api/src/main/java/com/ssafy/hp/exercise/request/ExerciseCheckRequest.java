package com.ssafy.hp.exercise.request;

import com.ssafy.hp.common.type.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseCheckRequest {
    private Integer exerciseId;

    private YN check;
}
