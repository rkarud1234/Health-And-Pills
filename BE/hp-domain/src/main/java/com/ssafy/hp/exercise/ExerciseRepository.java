package com.ssafy.hp.exercise;

import com.ssafy.hp.exercise.domain.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {

    // 운동 종류별 조회
    List<Exercise> findByExerciseCategory(ExerciseCategory category, Pageable pageable);

    // 운동 부위별 조회
//    List<Exercise> findByExercisePart(Integer part, Pageable pageable);
}

