package com.ssafy.hp.exercise.service;

import com.ssafy.hp.common.type.*;
import com.ssafy.hp.exercise.response.*;
import com.ssafy.hp.user.domain.*;
import org.springframework.data.domain.*;

import java.util.*;

public interface ExerciseService {

    // 운동 종류별 조회
    Page<ExerciseListResponse> findByExerciseCategory(User user, Integer category, Pageable pageable);

    // 운동 부위별 조회
    Page<ExerciseListResponse> findByExercisePart(User user, Integer part, Pageable pageable);

    // 운동 상세정보 조회
    ExerciseDetailResponse findByExerciseId(User user, Integer exerciseId);

    // 운동중, 좋아요, 북마크 상태 변경
    void updateUserExerciseByUserAndExercise(User user, Integer ExerciseId, YN yn, int cmd);

    List<ExerciseCategoryResponse> findAllExerciseCategory();

    List<ExercisePartCategoryResponse> findAllExercisePartCategory();

    List<List<ExerciseCalendarResponse>> findExerciseByUserExercise(User user, String search);
}
