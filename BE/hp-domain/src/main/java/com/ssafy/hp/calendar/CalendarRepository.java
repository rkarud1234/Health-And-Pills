package com.ssafy.hp.calendar;

import com.ssafy.hp.calendar.domain.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
    Long countByCalendarDate(Integer calendarDate);
}
