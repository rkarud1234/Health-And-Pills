package com.ssafy.hp.calendar.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hp.calendar.domain.Calendar;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.hp.calendar.domain.QCalendar.calendar;
import static com.ssafy.hp.exercise.domain.QExercise.exercise;
import static com.ssafy.hp.pill.domain.QPill.pill;

@Repository
@RequiredArgsConstructor
public class CalendarQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<Calendar> findByCalendarDate(User user, Integer calendarDate){
        return queryFactory
                .selectFrom(calendar)
                .leftJoin(calendar.pill, pill).fetchJoin()
                .leftJoin(calendar.exercise, exercise).fetchJoin()
                .where(calendar.calendarDate.eq(calendarDate),
                        calendar.users.eq(user))
                .orderBy(calendar.calendarTime.asc())
                .fetch();
    }
}
