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
    String exerciseName; // 운동이름

    Aerobic aerobic; // 유무산소

    Integer exercisePart; // 운동부위

    Integer exerciseCategory; // 운동 분류

    YN bookmark; // 북마크여부

    YN doing; // 운동중여부
}
