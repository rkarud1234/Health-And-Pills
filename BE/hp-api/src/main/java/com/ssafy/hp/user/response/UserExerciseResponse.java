package com.ssafy.hp.user.response;

import com.ssafy.hp.user.domain.UserExercise;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserExerciseResponse {
    private Integer id;
    private Integer relatedItemId;
    private String name;
    private List<String> type;

    public static UserExerciseResponse from(UserExercise userExercise){
        UserExerciseResponse userExerciseResponse = new UserExerciseResponse();
        userExerciseResponse.id = userExercise.getUserExerciseId();
        userExerciseResponse.relatedItemId = userExercise.getExercise().getExerciseId();
        userExerciseResponse.name = userExercise.getExercise().getExerciseName();
        userExerciseResponse.type = userExercise.getExercise().getExerciseParts().stream()
                .map(exercisePart -> exercisePart.getExercisePartCategory().getExercisePartCategoryName())
                .collect(Collectors.toList());
        return userExerciseResponse;
    }
}
