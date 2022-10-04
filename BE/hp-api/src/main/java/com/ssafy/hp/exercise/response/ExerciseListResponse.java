package com.ssafy.hp.exercise.response;


import com.ssafy.hp.common.type.*;
import com.ssafy.hp.exercise.domain.*;
import com.ssafy.hp.exercise.type.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseListResponse {

    private Integer exerciseId;

    private String exerciseName; // 운동이름

    private Aerobic aerobic; // 유무산소

    private String[] exerciseParts; // 운동부위

    private String exerciseCategory; // 운동 분류

    private String bookmark; // 북마크여부

    private String doing; // 운동중여부

    public static ExerciseListResponse from(Exercise exercise, String[] exerciseParts, String exerciseCategory, String bookmark, String doing) {
        ExerciseListResponse exerciseListResponse = new ExerciseListResponse();
        exerciseListResponse.exerciseId = exercise.getExerciseId();
        exerciseListResponse.exerciseName = exercise.getExerciseName();
        exerciseListResponse.aerobic = exercise.getExerciseAerobic();
        exerciseListResponse.exerciseParts = exerciseParts;
        exerciseListResponse.exerciseCategory = exerciseCategory;
        exerciseListResponse.bookmark = bookmark;
        exerciseListResponse.doing = doing;

        return exerciseListResponse;
    }
}
