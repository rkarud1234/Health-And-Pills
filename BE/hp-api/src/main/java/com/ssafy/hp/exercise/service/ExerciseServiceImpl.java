package com.ssafy.hp.exercise.service;

import com.ssafy.hp.*;
import com.ssafy.hp.common.type.*;
import com.ssafy.hp.exercise.*;
import com.ssafy.hp.exercise.domain.*;
import com.ssafy.hp.exercise.query.*;
import com.ssafy.hp.exercise.response.*;
import com.ssafy.hp.user.*;
import com.ssafy.hp.user.domain.*;
import com.ssafy.hp.user.response.*;
import com.ssafy.hp.user.service.*;
import lombok.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

import java.util.*;
import java.util.stream.*;

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
    private final ExercisePartCategoryRepository exercisePartCategoryRepository;
    private final UserRepository userRepository;
    private final UserExerciseRepository userExerciseRepository;
    private final ExerciseQueryRepository exerciseQueryRepository;
    private final UserService userService;

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

        return exercises.map(exercise -> {
            UserExerciseInfoResponse userExerciseInfo = userService.findByExerciseId(user, exercise.getExerciseId());
            return ExerciseListResponse.from(
                    exercise,
                    findExercisePartByExercise(exercise),
                    exerciseCategory.getExerciseCategoryName(),
                    userExerciseInfo.getExerciseBookmark(),
                    userExerciseInfo.getExerciseDoing());
        });
    }

    // 운동 부위별 조회
    @Override
    public Page<ExerciseListResponse> findByExercisePart(User user, Integer part, Pageable pageable) {
        ExercisePartCategory exercisePartCategory = exercisePartCategoryRepository.findById(part)
                .orElseThrow(() -> new NotFoundException(NotFoundException.CATEGORY_NOT_FOUND));

        return exerciseQueryRepository.findExerciseByExercisePartCategory(exercisePartCategory, pageable)
                .map(exercise -> {
                    UserExerciseInfoResponse userExerciseInfo = userService.findByExerciseId(user, exercise.getExerciseId());
                    return ExerciseListResponse.from(
                            exercise,
                            findExercisePartByExercise(exercise),
                            findExerciseCategoryById(exercise.getExerciseCategory().getExerciseCategoryId()).getExerciseCategoryName(),
                            userExerciseInfo.getExerciseBookmark(),
                            userExerciseInfo.getExerciseDoing());
                });
    }

    // 운동 상세정보 조회
    @Override
    public ExerciseDetailResponse findByExerciseId(User user, Integer exerciseId) {
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.EXERCISE_NOT_FOUND));

        UserExerciseInfoResponse userExerciseInfo = userService.findByExerciseId(user, exercise.getExerciseId());

        return ExerciseDetailResponse.from(
                exercise,
                findExercisePartByExercise(exercise),
                findExerciseCategoryById(exercise.getExerciseCategory().getExerciseCategoryId()).getExerciseCategoryName(),
                userExerciseInfo.getExerciseBookmark(),
                userExerciseInfo.getExerciseDoing(),
                userExerciseInfo.getExerciseLike());
    }

    @Override
    @Transactional
    public void updateUserExerciseByUserAndExercise(User user, Integer exerciseId, YN yn, int cmd) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new NotFoundException(EXERCISE_NOT_FOUND));

        Optional<UserExercise> userExercise = userExerciseRepository.findByUsersAndExercise(user, exercise);

        if (userExercise.isPresent()) {
            // 이미 컬럼이 있으면 해당 컬럼을 업데이트 해주면 됨
            updateUserExerciseByCmd(userExercise.get(), yn, cmd);
        } else {
            // 처음 등록되는 컬럼이라면 컬럼을 추가한다
            UserExercise newUserExercise = UserExercise.createUserExercise(user, exercise);
            updateUserExerciseByCmd(newUserExercise, yn, cmd);
            userExerciseRepository.save(newUserExercise);
        }
    }

    @Override
    public List<ExerciseCategoryResponse> findAllExerciseCategory() {
        return exerciseCategoryRepository.findAll()
                .stream().map(ExerciseCategoryResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExercisePartCategoryResponse> findAllExercisePartCategory() {
        return exercisePartCategoryRepository.findAll()
                .stream().map(ExercisePartCategoryResponse::from)
                .collect(Collectors.toList());
    }

    private void updateUserExerciseByCmd(UserExercise userExercise, YN yn, int cmd) {
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
