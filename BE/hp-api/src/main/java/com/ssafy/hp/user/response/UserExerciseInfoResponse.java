package com.ssafy.hp.user.response;

import com.ssafy.hp.user.domain.UserExercise;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserExerciseInfoResponse {
    private String exerciseDoing;
    private String exerciseBookmark;
    private String exerciseLike;

    public static UserExerciseInfoResponse from(UserExercise userExercise){
        UserExerciseInfoResponse userExerciseInfoResponse = new UserExerciseInfoResponse();
        userExerciseInfoResponse.exerciseDoing = String.valueOf(userExercise.getUserExerciseDoing());
        userExerciseInfoResponse.exerciseBookmark = String.valueOf(userExercise.getUserExerciseBookmark());
        userExerciseInfoResponse.exerciseLike = String.valueOf(userExercise.getUserExerciseLike());
        return userExerciseInfoResponse;
    }
}
