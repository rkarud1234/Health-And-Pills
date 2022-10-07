package com.ssafy.hp.exercise.response;

import com.ssafy.hp.exercise.domain.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExercisePartCategoryResponse {
    private Integer exercisePartCategoryId;

    private String exercisePartCategoryName;

    public static ExercisePartCategoryResponse from(ExercisePartCategory exercisePartCategory) {
        ExercisePartCategoryResponse exerciseCategoryResponse = new ExercisePartCategoryResponse();
        exerciseCategoryResponse.exercisePartCategoryId = exercisePartCategory.getExercisePartCategoryId();
        exerciseCategoryResponse.exercisePartCategoryName = exercisePartCategory.getExercisePartCategoryName();
        return exerciseCategoryResponse;
    }
}
