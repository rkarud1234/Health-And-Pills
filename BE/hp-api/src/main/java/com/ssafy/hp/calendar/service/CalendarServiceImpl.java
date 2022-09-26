package com.ssafy.hp.calendar.service;

import com.ssafy.hp.NotFoundException;
import com.ssafy.hp.calendar.CalendarRepository;
import com.ssafy.hp.calendar.domain.Calendar;
import com.ssafy.hp.calendar.query.CalendarQueryRepository;
import com.ssafy.hp.calendar.request.CreateCalendarRequest;
import com.ssafy.hp.calendar.request.UpdateCalendarRequest;
import com.ssafy.hp.calendar.response.CalendarCountListResponse;
import com.ssafy.hp.calendar.response.CalendarDetailListResponse;
import com.ssafy.hp.exercise.ExerciseRepository;
import com.ssafy.hp.exercise.domain.Exercise;
import com.ssafy.hp.pill.PillRepository;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.user.UserRepository;
import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
        return null;
    }

    @Override
    // 요일별 상세 일정 조회 리스트
    public List<CalendarDetailListResponse> findByCalendarDate(User user, Integer calendarDate) {
        List<Calendar> findCalendarList = calendarQueryRepository.findByCalendarDate(user, calendarDate);
        return findCalendarList.stream()
                .map(CalendarDetailListResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    // 일정 등록
    // (운동 & 영양제 구분한뒤 -> 복용중 or 운동중 하지 않았을 경우, 복용중 or 운동중 까지 등록)
    // 요일 리스트 분리해서 하나씩 넣기
    // * 요일당 99개 까지 가능
    public void createCalendar(User user, CreateCalendarRequest request) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        // 요일당 갯수 구해서 throw
        // 둘다 null일 경우

        if (request.getExerciseId() == null){
            Pill findPill = pillRepository.findById(request.getPillId())
                    .orElseThrow(() -> new NotFoundException(PILL_NOT_FOUND));

            for (int i = 0; i < request.getCalendarDate().size(); i++) {
                Calendar findCalendar = Calendar.createCalendar(request.getCalendarDate().get(i), request.getCalendarTime(), request.getCalendarContent(), user, null, findPill);
                calendarRepository.save(findCalendar);
            }
        }
        else {
            Exercise findExercise = exerciseRepository.findById(request.getExerciseId())
                    .orElseThrow(() -> new NotFoundException(EXERCISE_NOT_FOUND));

            for (int i = 0; i < request.getCalendarDate().size(); i++) {
                Calendar findCalendar = Calendar.createCalendar(request.getCalendarDate().get(i), request.getCalendarTime(), request.getCalendarContent(), user, findExercise, null);
                calendarRepository.save(findCalendar);
            }
        }
    }

    @Override
    // 일정 수정
    public void updateCalendar(User user, UpdateCalendarRequest request) {

    }

    @Override
    // 일정 삭제
    public void deleteCalendar(User user, Integer calendarId) {

    }

    @Override
    // 일정 완료 체크 & 체크해제
    public void updateCalendarComplete(User user, Integer calendarId) {

    }
}
