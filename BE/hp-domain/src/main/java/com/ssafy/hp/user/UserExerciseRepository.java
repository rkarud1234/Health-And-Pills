package com.ssafy.hp.user;

import com.ssafy.hp.common.type.*;
import com.ssafy.hp.exercise.domain.*;
import com.ssafy.hp.user.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface UserExerciseRepository extends JpaRepository<UserExercise, Integer> {

    Optional<UserExercise> findByUsersAndExercise(User user, Exercise exercise);
}
