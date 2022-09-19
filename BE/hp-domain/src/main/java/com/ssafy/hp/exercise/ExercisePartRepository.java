package com.ssafy.hp.exercise;

import com.ssafy.hp.exercise.domain.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;

import java.util.*;


public interface ExercisePartRepository extends JpaRepository<ExercisePart, Integer> {
    Page<ExercisePart> findByExercisePartCategory(ExerciseCategory exercisePartCategory, Pageable pageable);
}

