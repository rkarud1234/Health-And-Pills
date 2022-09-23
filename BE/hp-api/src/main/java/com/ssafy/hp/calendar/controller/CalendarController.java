package com.ssafy.hp.calendar.controller;

import com.ssafy.hp.calendar.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/calendar")
@RestController
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;

    // 회원의 일정 조회

    // 영양제 일정 등록 (복용중 하지 않았을 경우, 복용중 까지 등록) -> 이름, 내용, 요일, 시간

    // 운동 일정 등록 (운동중 하지 않았을 경우, 운동중 까지 등록) -> 이름, 내용, 요일, 시간

    // 영양제 일정 수정

    // 운동 일정 수정

    // 영양제 일정 삭제

    // 운동 일정 삭제

    // 일정 완료
}
