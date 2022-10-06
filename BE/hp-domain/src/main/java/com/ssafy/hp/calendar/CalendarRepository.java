package com.ssafy.hp.calendar;

import com.ssafy.hp.calendar.domain.Calendar;
import com.ssafy.hp.exercise.domain.Exercise;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalTime;
import java.util.List;


public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
    boolean existsByCalendarDateAndUsersAndCalendarTime(Integer calendarDate, User user, LocalTime calendarTime);
    List<Calendar> findByUsers(User user);
    Long countByCalendarDate(Integer calendarDate);
}
