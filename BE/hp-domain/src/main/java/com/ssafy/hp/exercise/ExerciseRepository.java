package com.ssafy.hp.exercise;

import com.ssafy.hp.exercise.domain.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {

    // 운동 종류별 조회
    Page<Exercise> findByExerciseCategoryOrderByExerciseNameAsc(ExerciseCategory category, Pageable pageable);
}

