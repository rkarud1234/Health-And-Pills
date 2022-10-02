package com.ssafy.hp.exercise.response;


import com.ssafy.hp.common.type.*;
import com.ssafy.hp.exercise.domain.*;
import com.ssafy.hp.exercise.type.*;
import com.ssafy.hp.user.response.UserExerciseInfoResponse;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseDetailResponse {
    private Integer exerciseId;

    private String exerciseName; // 운동이름

    private String exerciseContent; // 운동설명

    private String aerobic; // 유무산소

    private List<String> exerciseParts; // 운동부위

    private String exerciseCategory; // 운동 분류

    private String bookmark; // 북마크여부

    private String doing; // 운동중여부

    private String like; // 좋아요여부


    public static ExerciseDetailResponse from(Exercise exercise, UserExerciseInfoResponse userExerciseInfoResponse) {
        ExerciseDetailResponse exerciseDetailResponse = new ExerciseDetailResponse();
        exerciseDetailResponse.exerciseId = exercise.getExerciseId();
        exerciseDetailResponse.exerciseName = exercise.getExerciseName();
        exerciseDetailResponse.exerciseContent = exercise.getExerciseContent();
        exerciseDetailResponse.aerobic = exercise.getExerciseAerobic().toString();
        exerciseDetailResponse.exerciseParts = exercise.getExerciseParts().stream()
                .map(exercisePart -> exercisePart.getExercisePartCategory().getExercisePartCategoryName())
                .collect(Collectors.toList()).stream()
                .sorted(String::compareTo).collect(Collectors.toList());
        exerciseDetailResponse.exerciseCategory = exercise.getExerciseCategory().getExerciseCategoryName();
        exerciseDetailResponse.bookmark = userExerciseInfoResponse.getExerciseBookmark();
        exerciseDetailResponse.doing = userExerciseInfoResponse.getExerciseDoing();
        exerciseDetailResponse.like = userExerciseInfoResponse.getExerciseLike();

        return exerciseDetailResponse;
    }
}
