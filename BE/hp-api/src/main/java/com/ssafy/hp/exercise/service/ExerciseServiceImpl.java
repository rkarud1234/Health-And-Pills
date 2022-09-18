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

    // 해당 운동의 카테고리를 반환
    private ExerciseCategory findByExerciseCategory(Integer exerciseCategoryId) {
        return exerciseCategoryRepository.findById(exerciseCategoryId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.CATEGORY_NOT_FOUND));
    }

    // 운동 종류별 조회
    @Override
    public Page<ExerciseListResponse> findByExerciseCategory(User user, Integer exerciseCategoryId, Pageable pageable) {
        ExerciseCategory exerciseCategory = findByExerciseCategory(exerciseCategoryId);
        Page<Exercise> exercises = exerciseRepository.findByExerciseCategory(exerciseCategory, pageable);

        // TODO : 북마크,좋아요 여부 연결해야함
        return exercises.map(exercise ->
                ExerciseListResponse.from(exercise, findExercisePartByExercise(exercise), exerciseCategory.getExerciseCategoryName(), YN.N, YN.N));
    }

    // 운동 부위별 조회
    @Override
    public Page<ExerciseListResponse> findByExercisePart(User user, Integer part, Pageable pageable) {
        ExercisePartCategory exercisePartCategory = exercisePartCategoryRepository.findById(part)
                .orElseThrow(() -> new NotFoundException(NotFoundException.CATEGORY_NOT_FOUND));

        // TODO : 북마크,좋아요 여부 연결해야함
        return exerciseQueryRepository.findExerciseByExercisePartCategory(exercisePartCategory, pageable)
                .map(exercise -> ExerciseListResponse.from(exercise, findExercisePartByExercise(exercise),
                        findByExerciseCategory(exercise.getExerciseCategory().getExerciseCategoryId()).getExerciseCategoryName(), YN.N, YN.N));
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
