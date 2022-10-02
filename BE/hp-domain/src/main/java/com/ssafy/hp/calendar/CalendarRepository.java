package com.ssafy.hp.calendar;

import com.ssafy.hp.calendar.domain.Calendar;
import com.ssafy.hp.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
    List<Calendar> findByUsers(User user);
    Long countByCalendarDate(Integer calendarDate);
}
