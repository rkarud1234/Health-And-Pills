package com.ssafy.hp.user;

import com.ssafy.hp.user.domain.UserExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserExerciseRepository extends JpaRepository<UserExercise, Long> {
}
