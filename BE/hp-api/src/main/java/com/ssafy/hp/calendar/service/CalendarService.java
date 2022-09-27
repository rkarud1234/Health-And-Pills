package com.ssafy.hp.calendar.service;

import com.ssafy.hp.calendar.request.CreateCalendarRequest;
import com.ssafy.hp.calendar.request.UpdateCalendarRequest;
import com.ssafy.hp.calendar.response.CalendarCountListResponse;
import com.ssafy.hp.calendar.response.CalendarDetailListResponse;
import com.ssafy.hp.user.domain.User;

import java.util.List;

public interface CalendarService {
    List<CalendarCountListResponse> findListByCalendarDate(User user);

    List<CalendarDetailListResponse> findByCalendarDate(User user, Integer calendarDate);

    void createCalendar(User user, CreateCalendarRequest request);

    void updateCalendar(User user, Integer calendarId, UpdateCalendarRequest request);

    void deleteCalendar(User user, Integer calendarId);

    void updateCalendarComplete(User user, Integer calendarId);
}
