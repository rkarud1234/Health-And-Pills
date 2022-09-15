package com.ssafy.hp.exercise.service;

import com.ssafy.hp.common.type.*;
import com.ssafy.hp.exercise.response.*;
import org.springframework.data.domain.*;

public class ExerciseServiceImpl implements ExerciseService {
    @Override
    public Page<ExerciseListResponse> findByExerciseCategory(Integer category, Pageable pageable) {
        return null;
    }

    @Override
    public Page<ExerciseListResponse> findByExercisePart(Integer part, Pageable pageable) {
        return null;
    }

    @Override
    public ExerciseDetailResponse findByExerciseId(Integer exerciseId) {
        return null;
    }

    @Override
    public void updateUserExerciseDoingByExercise(Integer ExerciseId, YN yn) {

    }

    @Override
    public void updateUserExerciseLikeByExerciseId(Integer ExerciseId, YN yn) {

    }

    @Override
    public void updateUserExerciseBookmarkByExerciseId(Integer ExerciseId, YN yn) {

    }
}
