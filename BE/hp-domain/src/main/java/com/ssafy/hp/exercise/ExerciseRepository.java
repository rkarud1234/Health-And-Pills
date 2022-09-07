package com.ssafy.hp.exercise;

import com.ssafy.hp.exercise.domain.Exercise;
import com.ssafy.hp.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
}

