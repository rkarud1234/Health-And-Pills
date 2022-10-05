package com.ssafy.hp.calendar.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hp.calendar.domain.Calendar;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import static com.ssafy.hp.calendar.domain.QCalendar.calendar;
import static com.ssafy.hp.common.type.YN.N;
import static com.ssafy.hp.common.type.YN.Y;
import static com.ssafy.hp.exercise.domain.QExercise.exercise;
import static com.ssafy.hp.pill.domain.QPill.pill;
import static com.ssafy.hp.user.domain.QUser.user;

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

    public List<Calendar> findByCalendarTimeAndNotificationSend(){
        //5분 이상 차이나면서 처리가 안된것 조회 (queryDsl)

        return queryFactory
                .selectFrom(calendar)
                .leftJoin(calendar.users, user).fetchJoin()
                .where(calendar.calendarTime.lt(LocalTime.from(LocalDateTime.now().plusMinutes(5))),
                        calendar.notificationSend.eq(N))
                .fetch();
    }

    public void updateNotificationSend(List<Calendar> findCalendars){
        queryFactory
                .update(calendar)
                .set(calendar.notificationSend, Y)
                .where(calendar.in(findCalendars))
                .execute();

    }

    public List<Calendar> findByCalendarTimeAndCalendarCompleteAndCompleteSend(){
        return queryFactory
                .selectFrom(calendar)
                .leftJoin(calendar.users, user).fetchJoin()
                .where(calendar.calendarTime.lt(LocalTime.from(LocalDateTime.now().minusHours(1))),
                        calendar.completeSend.eq(N),
                        calendar.calendarComplete.eq(N))
                .fetch();
    }

    public void updateCompleteSend(List<Calendar> findCalendars){
        queryFactory
                .update(calendar)
                .set(calendar.completeSend, Y)
                .where(calendar.in(findCalendars))
                .execute();
    }
}
