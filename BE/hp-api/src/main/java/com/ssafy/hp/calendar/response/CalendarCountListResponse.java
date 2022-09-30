package com.ssafy.hp.calendar.response;

import com.ssafy.hp.calendar.domain.Calendar;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarCountListResponse {
    private Integer calendarDate;
    private int pillCount;
    private int exerciseCount;

    public static CalendarCountListResponse from(List<Calendar> calendars){
        CalendarCountListResponse calendarCountResponse = new CalendarCountListResponse();
        calendars.stream().forEach(calendar -> {
            calendarCountResponse.calendarDate = calendar.getCalendarDate();

        });
        calendarCountResponse.pillCount = (int) calendars.stream().filter(calendar -> calendar.getPill() != null).count();
        calendarCountResponse.exerciseCount = (int) calendars.stream().filter(calendar -> calendar.getExercise() != null).count();
        return calendarCountResponse;
    }
}
