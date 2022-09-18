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

    private static final int CMD_DOING = 1;
    private static final int CMD_LIKE = 2;
    private static final int CMD_BOOKMARK = 3;


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
    private ExerciseCategory findExerciseCategoryById(Integer exerciseCategoryId) {
        return exerciseCategoryRepository.findById(exerciseCategoryId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.CATEGORY_NOT_FOUND));
    }

    // 운동 종류별 조회
    @Override
    public Page<ExerciseListResponse> findByExerciseCategory(User user, Integer exerciseCategoryId, Pageable pageable) {
        ExerciseCategory exerciseCategory = findExerciseCategoryById(exerciseCategoryId);
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
                        findExerciseCategoryById(exercise.getExerciseCategory().getExerciseCategoryId()).getExerciseCategoryName(), YN.N, YN.N));
    }

    // 운동 상세정보 조회
    @Override
    public ExerciseDetailResponse findByExerciseId(User user, Integer exerciseId) {
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.EXERCISE_NOT_FOUND));
        // TODO : 북마크,좋아요 여부 연결해야함
        return ExerciseDetailResponse.from(exercise, findExercisePartByExercise(exercise),
                findExerciseCategoryById(exercise.getExerciseCategory().getExerciseCategoryId()).getExerciseCategoryName(),
                YN.N, YN.N, YN.N);
    }

    @Override
    @Transactional
    public void updateUserExerciseByUserAndExercise(User user, Integer exerciseId, YN yn, int cmd) {
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Optional<UserExercise> userExercise = userExerciseRepository.findByUsersAndExercise(findUser, exercise);

        if (userExercise.isPresent()) {
            // 이미 컬럼이 있으면 해당 컬럼을 업데이트 해주면 됨
            updateExerciseUserByCmd(userExercise.get(), yn, cmd);
        } else {
            // 처음 등록되는 컬럼이라면 컬럼을 추가한다
            UserExercise newUserExercise = UserExercise.createUserExercise(findUser, exercise);
            updateExerciseUserByCmd(newUserExercise, yn, cmd);
            userExerciseRepository.save(newUserExercise);
        }
    }

    private void updateExerciseUserByCmd(UserExercise userExercise, YN yn, int cmd) {
        if (cmd == CMD_DOING) {
            userExercise.updateUserExerciseDoing(yn);
        } else if (cmd == CMD_LIKE) {
            userExercise.updateUserExerciseLike(yn);
        } else if (cmd == CMD_BOOKMARK) {
            userExercise.updateUserExerciseBookmark(yn);
        } else {
            throw new InvalidException(InvalidException.INVALID_REQUEST);
        }
    }
}
