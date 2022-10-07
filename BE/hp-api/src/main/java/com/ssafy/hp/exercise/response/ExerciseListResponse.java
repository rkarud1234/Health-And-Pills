package com.ssafy.hp.exercise.response;


import com.ssafy.hp.exercise.domain.*;
import com.ssafy.hp.user.response.UserExerciseInfoResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseListResponse {

    private Integer exerciseId;

    private String exerciseName; // 운동이름

    private String aerobic; // 유무산소

    private List<String> exerciseParts; // 운동부위

    private String exerciseCategory; // 운동 분류

    private String bookmark; // 북마크여부

    private String doing; // 운동중여부

    public static ExerciseListResponse from(Exercise exercise, UserExerciseInfoResponse userExerciseInfoResponse) {
        ExerciseListResponse exerciseListResponse = new ExerciseListResponse();
        exerciseListResponse.exerciseId = exercise.getExerciseId();
        exerciseListResponse.exerciseName = exercise.getExerciseName();
        exerciseListResponse.aerobic = exercise.getExerciseAerobic().toString();
        exerciseListResponse.exerciseParts = exercise.getExerciseParts().stream()
                .map(exercisePart -> exercisePart.getExercisePartCategory().getExercisePartCategoryName())
                .collect(Collectors.toList()).stream()
                .sorted(String::compareTo).collect(Collectors.toList());
        exerciseListResponse.exerciseCategory = exercise.getExerciseCategory().getExerciseCategoryName();
        exerciseListResponse.bookmark = userExerciseInfoResponse.getExerciseBookmark();
        exerciseListResponse.doing = userExerciseInfoResponse.getExerciseDoing();

        return exerciseListResponse;
    }
}
