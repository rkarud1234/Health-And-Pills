package com.ssafy.hp.exercise.query;

import com.querydsl.core.*;
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
import static com.ssafy.hp.exercise.domain.QExercisePartCategory.exercisePartCategory;

@Repository
@RequiredArgsConstructor
public class ExerciseQueryRepository {
    private final JPAQueryFactory queryFactory;

    // 해당 운동의 운동부위를 반환
    public List<String> findExercisePartByExercise(Exercise exercise) {
        return queryFactory
                .select(exercisePartCategory.exercisePartCategoryName)
                .from(exercisePartCategory)
                .join(exercisePart)
                .on(exercisePartCategory.eq(exercisePart.exercisePartCategory))
                .where(exercisePart.exercise.eq(exercise))
                .fetch();
    }

    // 해당 부위의 운동들을 반환

    public Page<Exercise> findExerciseByExercisePartCategory(ExercisePartCategory exercisePartCategory, Pageable pageable) {
        List<Exercise> results = queryFactory
                .selectFrom(exercise)
                .join(exercisePart)
                .on(exercise.eq(exercisePart.exercise))
                .where(exercisePart.exercisePartCategory.eq(exercisePartCategory))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(results);
    }

    public List<List<ExerciseCalendarResponse>> findExerciseByUserExercise(User user, String search) {
//        select *
//                from exercise as e
        //       join user_exercise u
        //     on e.exercise_id = u.exercise_id
        //   where u.user_exercise_doing = "Y"
        // and e.exercise_name like "%벤치%"
        //and user_id=34;
        List<Exercise> doing = queryFactory
                .selectFrom(exercise)
                .join(userExercise)
                .on(exercise.eq(userExercise.exercise))
                .where(userExercise.userExerciseDoing.eq(YN.Y)
                        .and(exercise.exerciseName.contains(search))
                        .and(userExercise.users.eq(user)))
                .limit(5)
                .fetch();

//        select *
//                from exercise
//        where exercise_name like "%벤치%"
//        and exercise_id not in (select e.exercise_id
//        from exercise as e
//        join user_exercise u
//        on e.exercise_id = u.exercise_id
//        where u.user_exercise_doing = "Y"
//        and e.exercise_name like "%벤치%"
//        and user_id=34);
        List<Exercise> notDoing = queryFactory
                .selectFrom(exercise)
                .where(exercise.exerciseName.contains(search)
                        .and(exercise.notIn(doing)))
                .limit(5)
                .fetch();

        List<List<ExerciseCalendarResponse>> result = new ArrayList<>();
        result.add(doing.stream().map(ExerciseCalendarResponse::from).collect(Collectors.toList()));
        result.add(notDoing.stream().map(ExerciseCalendarResponse::from).collect(Collectors.toList()));

        return result;
    }
}
