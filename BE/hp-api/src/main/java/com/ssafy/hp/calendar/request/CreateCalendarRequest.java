package com.ssafy.hp.calendar.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateCalendarRequest {
    private Integer exerciseId;

    private Integer pillId;

    private String calendarContent;

    private List<Integer> calendarDate;

    private LocalTime calendarTime;
}
