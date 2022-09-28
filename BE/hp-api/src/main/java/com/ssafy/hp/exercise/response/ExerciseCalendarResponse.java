package com.ssafy.hp.exercise.response;

import com.ssafy.hp.exercise.domain.Exercise;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseCalendarResponse {
    private Integer exerciseId;

    private String exerciseName;

    public static ExerciseCalendarResponse from(Exercise exercise) {
        ExerciseCalendarResponse exerciseCalendarResponse = new ExerciseCalendarResponse();
        exerciseCalendarResponse.exerciseId = exercise.getExerciseId();
        exerciseCalendarResponse.exerciseName = exercise.getExerciseName();
        return exerciseCalendarResponse;
    }
}
