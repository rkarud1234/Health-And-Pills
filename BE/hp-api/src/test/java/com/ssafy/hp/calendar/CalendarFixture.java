package com.ssafy.hp.calendar;

import com.ssafy.hp.calendar.request.CreateCalendarRequest;
import com.ssafy.hp.calendar.request.UpdateCalendarRequest;
import com.ssafy.hp.calendar.response.CalendarCountListResponse;
import com.ssafy.hp.calendar.response.CalendarDetailListResponse;

import java.time.LocalTime;

public class CalendarFixture {
    public static final Integer ID = 1;
    public static final Integer DATE = 1;
    public static final Integer COUNT = 1;
    public static final LocalTime TIME = LocalTime.now();
    public static final String CONTENT = "내용";
    public static final String NAME = "이름";
    public static final String YN_FIELD = "Y";


    public static final CreateCalendarRequest TEST_CALENDAR_CREATE_REQUEST
            = new CreateCalendarRequest(ID, ID, CONTENT, DATE, TIME);
    public static final UpdateCalendarRequest TEST_CALENDAR_UPDATE_REQUEST
            = new UpdateCalendarRequest(CONTENT, TIME);

    public static final CalendarCountListResponse TEST_CALENDAR_COUNT_LIST_RESPONSE
            = new CalendarCountListResponse(COUNT, COUNT);
    public static final CalendarDetailListResponse TEST_CALENDAR_DETAIL_LIST_RESPONSE
            = new CalendarDetailListResponse(ID, ID, NAME, DATE, TIME, CONTENT, YN_FIELD);
}
