package com.ssafy.hp.exercise.service;

import com.ssafy.hp.*;
import com.ssafy.hp.common.type.*;
import com.ssafy.hp.exercise.*;
import com.ssafy.hp.exercise.domain.*;
import com.ssafy.hp.exercise.query.*;
import com.ssafy.hp.exercise.response.*;
import com.ssafy.hp.user.*;
import com.ssafy.hp.user.domain.*;
import lombok.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

import java.util.*;

import static com.ssafy.hp.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final ExerciseCategoryRepository exerciseCategoryRepository;
    private final ExercisePartRepository exercisePartRepository;
    private final ExercisePartCategoryRepository exercisePartCategoryRepository;
    private final UserRepository userRepository;
    private final UserExerciseRepository userExerciseRepository;

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

    // 운동 상세정보 조회
    @Override
    public ExerciseDetailResponse findByExerciseId(User user, Integer exerciseId) {
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.EXERCISE_NOT_FOUND));
        // TODO : 북마크,좋아요 여부 연결해야함
        return ExerciseDetailResponse.from(exercise, findExercisePartByExercise(exercise),
                findByExerciseCategory(exercise.getExerciseCategory().getExerciseCategoryId()).getExerciseCategoryName(),
                YN.N, YN.N, YN.N);
    }

    @Override
    @Transactional
    public void updateUserExerciseDoingByExercise(User user, Integer exerciseId, YN yn) {
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Optional<UserExercise> userExercise = userExerciseRepository.findByUsersAndExercise(findUser, exercise);
        System.out.println("ExerciseServiceImpl.updateUserExerciseDoingByExercise");

        if (userExercise.isPresent()) {
            // 이미 컬럼이 있으면 해당 컬럼을 업데이트 해주면 됨
            System.out.println("있음");
            userExercise.get().updateUserExerciseDoing(yn);
        } else {
            // 처음 등록되는 컬럼이라면 컬럼을 추가한다
            System.out.println("없음");
            UserExercise newUserExercise = UserExercise.createUserExercise(findUser, exercise, yn, null, YN.N);
            userExerciseRepository.save(newUserExercise);
        }
    }

    @Override
    public void updateUserExerciseLikeByExerciseId(User user, Integer ExerciseId, YN yn) {

    }

    @Override
    public void updateUserExerciseBookmarkByExerciseId(User user, Integer ExerciseId, YN yn) {

    }
}
