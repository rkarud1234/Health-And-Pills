package com.ssafy.hp.calendar.service;

import com.ssafy.hp.CountOutOfBoundsException;
import com.ssafy.hp.NotFoundException;
import com.ssafy.hp.calendar.CalendarRepository;
import com.ssafy.hp.calendar.domain.Calendar;
import com.ssafy.hp.calendar.query.CalendarQueryRepository;
import com.ssafy.hp.calendar.request.CreateCalendarRequest;
import com.ssafy.hp.calendar.request.UpdateCalendarRequest;
import com.ssafy.hp.calendar.response.CalendarCountListResponse;
import com.ssafy.hp.calendar.response.CalendarDetailListResponse;
import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.exercise.ExerciseRepository;
import com.ssafy.hp.exercise.domain.Exercise;
import com.ssafy.hp.pill.PillRepository;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.user.UserRepository;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.ssafy.hp.CountOutOfBoundsException.CALENDAR_OUT_OF_BOUNDS;
import static com.ssafy.hp.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CalendarServiceImpl implements CalendarService{
    private final CalendarRepository calendarRepository;
    private final UserRepository userRepository;
    private final ExerciseRepository exerciseRepository;
    private final PillRepository pillRepository;
    private final CalendarQueryRepository calendarQueryRepository;

    @Override
    // 회원의 요일별 영양제 & 운동 갯수 조회
    public List<CalendarCountListResponse> findListByCalendarDate(User user) {
        List<Calendar> findCalendars = calendarQueryRepository.findByUsersAndCalendarDate(user);

        Map<Integer, List<Calendar>> findCalendarsMap = findCalendars.stream()
                .collect(Collectors.groupingBy(Calendar::getCalendarDate));

        return findCalendarsMap.values().stream()
                .map(CalendarCountListResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    // 요일별 상세 일정 조회 리스트
    public List<CalendarDetailListResponse> findByCalendarDate(User user, Integer calendarDate) {
        List<Calendar> findCalendars = calendarQueryRepository.findByCalendarDate(user, calendarDate);
        return findCalendars.stream()
                .map(CalendarDetailListResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    // 일정 등록
    // 체크 사항
    // 회원 존재하는지, 해당요일에 일정 99개 미만인지, 운동&영양제ID 둘다 null값 들어왔는지

    // 운동 등록일때 -> 회원의 ID로 UserExercise에 존재하는지 확인 -> 있으면 일정에만 등록 / 없으면 일정+회원정보에 등록
    // 영양제 등록일떼 -> 회원의 IDfh UserPill에 존재하는지 확인 -> 있으면 일정에만 등록 / 없으면 일정+회원정보에 등록
    public void createCalendar(User user, CreateCalendarRequest request) {
        if(calendarRepository.countByCalendarDate(request.getCalendarDate()) >= 99){
            new CountOutOfBoundsException(CALENDAR_OUT_OF_BOUNDS);
        }
        //controller
        if(request.getExerciseId() == null && request.getPillId() == null){
            new NotFoundException(EXERCISE_NOT_FOUND + PILL_NOT_FOUND);
        }

        Calendar findCalendar = null;
        if (request.getExerciseId() == null){
            Pill findPill = pillRepository.findById(request.getPillId())
                    .orElseThrow(() -> new NotFoundException(PILL_NOT_FOUND));
            findCalendar = Calendar.createCalendar(request.getCalendarDate(), request.getCalendarTime(), request.getCalendarContent(), user, null, findPill);
        }
        else {
            Exercise findExercise = exerciseRepository.findById(request.getExerciseId())
                    .orElseThrow(() -> new NotFoundException(EXERCISE_NOT_FOUND));
            findCalendar = Calendar.createCalendar(request.getCalendarDate(), request.getCalendarTime(), request.getCalendarContent(), user, findExercise, null);
        }
        calendarRepository.save(findCalendar);
    }

    @Transactional
    @Override
    // 일정 수정
    public void updateCalendar(User user, Integer calendarId, UpdateCalendarRequest request) {
        Calendar findCalendar = calendarRepository.findById(calendarId)
                .orElseThrow(() -> new NotFoundException(CALENDAR_NOT_FOUND));

        findCalendar.updateCalendar(request.getCalendarContent(), request.getCalendarTime());
    }

    @Transactional
    @Override
    // 일정 삭제
    public void deleteCalendar(User user, Integer calendarId) {
        Calendar findCalendar = calendarRepository.findById(calendarId)
                .orElseThrow(() -> new NotFoundException(CALENDAR_NOT_FOUND));

        calendarRepository.delete(findCalendar);
    }

    @Transactional
    @Override
    // 일정 완료 체크 & 체크해제
    public void updateCalendarComplete(User user, Integer calendarId) {
        Calendar findCalendar = calendarRepository.findById(calendarId)
                .orElseThrow(() -> new NotFoundException(CALENDAR_NOT_FOUND));
        if (findCalendar.getCalendarComplete() == YN.Y){
            findCalendar.updateCalendarComplete(YN.N);
        }
        else {
            findCalendar.updateCalendarComplete(YN.Y);
        }
    }
}
