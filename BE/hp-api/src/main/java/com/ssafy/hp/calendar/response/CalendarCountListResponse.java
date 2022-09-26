package com.ssafy.hp.calendar.response;

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

    public static CalendarCountListResponse from(int pillCount, int exerciseCount){
        CalendarCountListResponse calendarCountResponse = new CalendarCountListResponse();
        calendarCountResponse.pillCount = pillCount;
        calendarCountResponse.exerciseCount = exerciseCount;
        return calendarCountResponse;
    }
}
