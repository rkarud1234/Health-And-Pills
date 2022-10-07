package com.ssafy.hp.calendar.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCalendarRequest {
    private String calendarContent;

    private LocalTime calendarTime;
}
