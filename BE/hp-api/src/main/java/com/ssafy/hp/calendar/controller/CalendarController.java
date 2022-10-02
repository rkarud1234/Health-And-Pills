package com.ssafy.hp.calendar.controller;

import com.ssafy.hp.calendar.request.CreateCalendarRequest;
import com.ssafy.hp.calendar.request.UpdateCalendarRequest;
import com.ssafy.hp.calendar.response.CalendarCountListResponse;
import com.ssafy.hp.calendar.response.CalendarDetailListResponse;
import com.ssafy.hp.calendar.service.CalendarService;
import com.ssafy.hp.config.LoginUser;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/api/calendars")
@RestController
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;

    // 회원의 요일별 영양제 & 운동 갯수 조회
    @GetMapping
    public ResponseEntity<List<CalendarCountListResponse>> findListByCalendarDate(@LoginUser User user){
        List<CalendarCountListResponse> body = calendarService.findListByCalendarDate(user);
        return ResponseEntity.ok().body(body);
    }

    // 요일별 상세 일정 조회 리스트
    @GetMapping("/{calendar_date}")
    public ResponseEntity<List<CalendarDetailListResponse>> findByCalendarDate(@LoginUser User user,
                                                                               @PathVariable("calendar_date")Integer calendarDate){
        List<CalendarDetailListResponse> body = calendarService.findByCalendarDate(user, calendarDate);
        return ResponseEntity.ok().body(body);
    }

    // 일정 등록
    // (운동 & 영양제 구분한뒤 -> 복용중 or 운동중 하지 않았을 경우, 복용중 or 운동중 까지 등록)
    // * 요일당 99개 까지 가능
    @PostMapping
    public ResponseEntity<Void> createCalendar(@LoginUser User user,
                                               @RequestBody @Valid CreateCalendarRequest request){
        calendarService.createCalendar(user, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    // 일정 수정
    @PutMapping("/{calendar_id}")
    public ResponseEntity<Void> updateCalendar(@LoginUser User user,
                                               @PathVariable("calendar_id")Integer calendarId,
                                               @RequestBody @Valid UpdateCalendarRequest request){
        calendarService.updateCalendar(user, calendarId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 일정 삭제
    @DeleteMapping("/{calendar_id}")
    public ResponseEntity<Void> deleteCalendar(@LoginUser User user,
                                               @PathVariable("calendar_id")Integer calendarId){
        calendarService.deleteCalendar(user, calendarId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 일정 완료 체크 & 체크해제
    @PatchMapping("/{calendar_id}")
    public ResponseEntity<Void> updateCalendarComplete(@LoginUser User user,
                                                       @PathVariable("calendar_id")Integer calendarId){
        calendarService.updateCalendarComplete(user, calendarId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
