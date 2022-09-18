package com.ssafy.hp.exercise.service;

import com.ssafy.hp.*;
import com.ssafy.hp.common.type.*;
import com.ssafy.hp.exercise.*;
import com.ssafy.hp.exercise.domain.*;
import com.ssafy.hp.exercise.query.*;
import com.ssafy.hp.exercise.response.*;
import com.ssafy.hp.user.domain.*;
import lombok.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

import java.util.*;
import java.util.stream.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final ExerciseCategoryRepository exerciseCategoryRepository;
    private final ExercisePartRepository exercisePartRepository;
    private final ExercisePartCategoryRepository exercisePartCategoryRepository;

    private final ExerciseQueryRepository exerciseQueryRepository;

    // 해당 운동의 운동부위 배열을 반환
    private String[] findExercisePartByExercise(Exercise exercise) {
        return exerciseQueryRepository.findExercisePartByExercise(exercise).toArray(String[]::new);
    }

    // 운동 종류별 조회
    @Override
    public Page<ExerciseListResponse> findByExerciseCategory(User user, Integer category, Pageable pageable) {
        ExerciseCategory exerciseCategory = exerciseCategoryRepository.findById(category)
                .orElseThrow(() -> new NotFoundException(NotFoundException.CATEGORY_NOT_FOUND));
        Page<Exercise> exercises = exerciseRepository.findByExerciseCategory(exerciseCategory, pageable);

        // TODO : 북마크,좋아요 여부 연결해야함
        return exercises.map(exercise ->
                ExerciseListResponse.from(exercise, findExercisePartByExercise(exercise), exerciseCategory.getExerciseCategoryName(), YN.N, YN.N));
    }

    // 운동 부위별 조회
    @Override
    public Page<ExerciseListResponse> findByExercisePart(Integer part, Pageable pageable) {
        ExercisePart exercisePart = exercisePartRepository.findById(part)
                .orElseThrow(() -> new NotFoundException(NotFoundException.CATEGORY_NOT_FOUND));


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
