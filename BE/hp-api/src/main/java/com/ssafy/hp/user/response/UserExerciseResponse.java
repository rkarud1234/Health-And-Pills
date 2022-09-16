package com.ssafy.hp.user.response;

import com.ssafy.hp.exercise.domain.Exercise;
import com.ssafy.hp.user.domain.UserExercise;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserExerciseResponse {
    private int id;
    private int relatedItemId;
    private String name;
    private String type;

    public static UserExerciseResponse from(UserExercise userExercise){
        UserExerciseResponse userExerciseResponse = new UserExerciseResponse();
        userExerciseResponse.id = userExercise.getUserExerciseId();
        userExerciseResponse.relatedItemId = userExercise.getExercise().getExerciseId();
        userExerciseResponse.name = userExercise.getExercise().getExerciseName();
        return userExerciseResponse;
    }
}
