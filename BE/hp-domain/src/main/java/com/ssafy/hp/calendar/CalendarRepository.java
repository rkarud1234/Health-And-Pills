package com.ssafy.hp.calendar;

import com.ssafy.hp.calendar.domain.Calendar;
import com.ssafy.hp.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;


public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
    boolean existsByCalendarDateAndUsersAndCalendarTime(Integer calendarDate, User user, LocalTime calendarTime);
    Optional<Calendar> findByCalendarDateAndUsersAndCalendarTime(Integer calendarDate, User user, LocalTime calendarTime);
    List<Calendar> findByUsers(User user);
    Long countByCalendarDate(Integer calendarDate);
}
