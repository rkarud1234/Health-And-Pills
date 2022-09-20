package com.ssafy.hp.exercise.response;


import com.ssafy.hp.common.type.*;
import com.ssafy.hp.exercise.domain.*;
import com.ssafy.hp.exercise.type.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseDetailResponse {
    private String exerciseName; // 운동이름

    private String exerciseContent; // 운동설명

    private Aerobic aerobic; // 유무산소

    private String[] exerciseParts; // 운동부위

    private String exerciseCategory; // 운동 분류

    private String bookmark; // 북마크여부

    private String doing; // 운동중여부

    private String like; // 좋아요여부


    public static ExerciseDetailResponse from(Exercise exercise, String[] exerciseParts, String exerciseCategory, String bookmark, String doing, String like) {
        ExerciseDetailResponse exerciseDetailResponse = new ExerciseDetailResponse();
        exerciseDetailResponse.exerciseName = exercise.getExerciseName();
        exerciseDetailResponse.exerciseContent = exercise.getExerciseContent();
        exerciseDetailResponse.aerobic = exercise.getExerciseAerobic();
        exerciseDetailResponse.exerciseParts = exerciseParts;
        exerciseDetailResponse.exerciseCategory = exerciseCategory;
        exerciseDetailResponse.bookmark = bookmark;
        exerciseDetailResponse.doing = doing;
        exerciseDetailResponse.like = like;

        return exerciseDetailResponse;
    }
}
