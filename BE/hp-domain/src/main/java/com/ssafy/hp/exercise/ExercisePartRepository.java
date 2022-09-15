package com.ssafy.hp.exercise;

import com.ssafy.hp.exercise.domain.*;
import org.springframework.data.jpa.repository.*;

import java.util.*;


public interface ExercisePartRepository extends JpaRepository<ExercisePart, Integer> {
    List<ExercisePart> findByExercisePartCategory(ExerciseCategory exercisePartCategory);
}

