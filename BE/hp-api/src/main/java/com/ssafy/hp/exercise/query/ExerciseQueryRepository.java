package com.ssafy.hp.exercise.query;

import com.querydsl.jpa.impl.*;
import com.ssafy.hp.exercise.domain.*;
import lombok.*;
import org.springframework.stereotype.*;

import java.util.*;

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

}
