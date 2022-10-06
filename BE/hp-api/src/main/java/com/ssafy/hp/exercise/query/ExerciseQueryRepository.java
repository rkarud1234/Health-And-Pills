package com.ssafy.hp.exercise.query;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.*;
import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.exercise.domain.*;
import com.ssafy.hp.exercise.response.ExerciseCalendarResponse;
import com.ssafy.hp.user.domain.User;
import lombok.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.*;

import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.hp.exercise.domain.QExercise.exercise;
import static com.ssafy.hp.user.domain.QUserExercise.userExercise;
import static com.ssafy.hp.exercise.domain.QExercisePart.exercisePart;

@Repository
@RequiredArgsConstructor
public class ExerciseQueryRepository {
    private final JPAQueryFactory queryFactory;

    // 해당 부위의 운동들을 반환
    public Page<Exercise> findExerciseByExercisePartCategory(ExercisePartCategory exercisePartCategory, Pageable pageable) {
        QueryResults<Exercise> results = queryFactory
                .selectFrom(exercise)
                .join(exercisePart)
                .on(exercise.eq(exercisePart.exercise))
                .where(exercisePart.exercisePartCategory.eq(exercisePartCategory))
                .orderBy(exercise.exerciseName.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<Exercise> content = results.getResults();
        long total = results.getTotal();
        return new PageImpl<>(content, pageable, total);
    }

    public List<List<ExerciseCalendarResponse>> findExerciseByUserExercise(User user, String search) {
        List<Exercise> doing = queryFactory
                .selectFrom(exercise)
                .join(userExercise)
                .on(exercise.eq(userExercise.exercise))
                .where(userExercise.userExerciseDoing.eq(YN.Y)
                        .and(exercise.exerciseName.contains(search))
                        .and(userExercise.users.eq(user)))
                .orderBy(exercise.exerciseName.asc())
                .limit(5)
                .fetch();

        List<Exercise> notDoing = queryFactory
                .selectFrom(exercise)
                .where(exercise.exerciseName.contains(search)
                        .and(exercise.notIn(doing)))
                .orderBy(exercise.exerciseName.asc())
                .limit(5)
                .fetch();

        List<List<ExerciseCalendarResponse>> result = new ArrayList<>();
        result.add(doing.stream().map(ExerciseCalendarResponse::from).collect(Collectors.toList()));
        result.add(notDoing.stream().map(ExerciseCalendarResponse::from).collect(Collectors.toList()));

        return result;
    }
}
