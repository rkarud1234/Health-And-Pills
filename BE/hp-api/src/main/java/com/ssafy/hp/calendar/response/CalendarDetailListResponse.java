package com.ssafy.hp.calendar.response;

import com.ssafy.hp.calendar.domain.Calendar;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarDetailListResponse {
    private Integer exerciseId;

    private Integer pillId;

    private String name;

    private Integer calendarDate;

    private LocalTime calendarTime;

    private String calendarContent;

    private String calendarComplete;

    public static CalendarDetailListResponse from(Calendar calendar){
        CalendarDetailListResponse calendarDetailListResponse = new CalendarDetailListResponse();
        calendarDetailListResponse.exerciseId = calendar.getExercise().getExerciseId();
        calendarDetailListResponse.pillId = calendar.getPill().getPillId();
        calendarDetailListResponse.calendarDate = calendar.getCalendarDate();
        calendarDetailListResponse.calendarTime = calendar.getCalendarTime();
        calendarDetailListResponse.calendarContent = calendar.getCalendarContent();
        calendarDetailListResponse.calendarComplete = String.valueOf(calendar.getCalendarComplete());
        if(calendar.getExercise().getExerciseId() == null){
            calendarDetailListResponse.name = calendar.getPill().getPillName();
        }
        else {
            calendarDetailListResponse.name = calendar.getExercise().getExerciseName();
        }
        return calendarDetailListResponse;
    }
}
