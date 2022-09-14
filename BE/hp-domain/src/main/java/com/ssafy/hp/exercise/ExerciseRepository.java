package com.ssafy.hp.exercise;

import com.ssafy.hp.exercise.domain.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
}

