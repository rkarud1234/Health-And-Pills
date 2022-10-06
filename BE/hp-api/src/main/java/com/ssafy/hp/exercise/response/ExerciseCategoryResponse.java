package com.ssafy.hp.exercise.response;

import com.ssafy.hp.exercise.domain.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseCategoryResponse {
    private Integer exerciseCategoryId;

    private String exerciseCategoryName;

    public static ExerciseCategoryResponse from(ExerciseCategory exerciseCategory) {
        ExerciseCategoryResponse exerciseCategoryResponse = new ExerciseCategoryResponse();
        exerciseCategoryResponse.exerciseCategoryId = exerciseCategory.getExerciseCategoryId();
        exerciseCategoryResponse.exerciseCategoryName = exerciseCategory.getExerciseCategoryName();
        return exerciseCategoryResponse;
    }
}
