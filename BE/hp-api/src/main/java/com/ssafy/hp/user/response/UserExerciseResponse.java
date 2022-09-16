package com.ssafy.hp.user.response;

import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.user.domain.UserExercise;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserExerciseResponse {
    // 회원운동번호 회원번호 운동중여부 좋아요여부 북마크여부
    private int userExerciseId;

    private int exerciseId;

    private YN userExerciseDoing;

    private YN userExerciseLike;

    private YN userExerciseBookmark;

    public static UserExerciseResponse from(UserExercise userExercise){
        UserExerciseResponse userExerciseResponse = new UserExerciseResponse();
        userExerciseResponse.userExerciseId = userExercise.getUserExerciseId();
        userExerciseResponse.exerciseId = userExercise.getExercise().getExerciseId();
        userExerciseResponse.userExerciseDoing = userExercise.getUserExerciseDoing();
        userExerciseResponse.userExerciseLike = userExercise.getUserExerciseLike();
        userExerciseResponse.userExerciseBookmark = userExercise.getUserExerciseBookmark();
        return userExerciseResponse;
    }
}
