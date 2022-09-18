package com.ssafy.hp.exercise.response;


import com.ssafy.hp.common.type.*;
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
    private String exerciseName; // 운동이름

    private Aerobic aerobic; // 유무산소

    private String[] exerciseParts; // 운동부위

    private Integer exerciseCategory; // 운동 분류

    private YN bookmark; // 북마크여부

    private YN doing; // 운동중여부
}
