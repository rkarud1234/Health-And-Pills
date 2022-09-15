package com.ssafy.hp.user;

import com.ssafy.hp.common.type.*;
import com.ssafy.hp.exercise.domain.*;
import com.ssafy.hp.user.domain.UserExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserExerciseRepository extends JpaRepository<UserExercise, Integer> {
    // 운동중 상태 변경
//    void updateUserExerciseDoingByExercise(Exercise exercise, YN yn);


    // 좋아요 상태 변경
//    void updateUserExerciseLikeByExercise(Exercise exercise, YN yn);

    // 북마크 상태 변경
//    void updateUserExerciseBookmarkByExercise(Exercise exercise, YN yn);
}
