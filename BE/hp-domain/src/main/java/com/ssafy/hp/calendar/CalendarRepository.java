package com.ssafy.hp.calendar;

import com.ssafy.hp.calendar.domain.Calendar;
import com.ssafy.hp.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
    List<Calendar> findByUsersAndAndCalendarDate(User user,Integer calendarDate);
}
