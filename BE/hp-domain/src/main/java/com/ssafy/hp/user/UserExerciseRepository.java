package com.ssafy.hp.user;

import com.ssafy.hp.exercise.domain.*;
import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.domain.UserExercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserExerciseRepository extends JpaRepository<UserExercise, Integer> {
    Optional<UserExercise> findUserExerciseByUsersAndExercise(User user, Exercise exercise);
}
