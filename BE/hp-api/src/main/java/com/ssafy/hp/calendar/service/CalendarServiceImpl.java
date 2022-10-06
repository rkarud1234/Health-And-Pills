package com.ssafy.hp.calendar.service;

import com.ssafy.hp.CountOutOfBoundsException;
import com.ssafy.hp.DuplicateException;
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
import com.ssafy.hp.exercise.service.ExerciseService;
import com.ssafy.hp.fcm.FirebaseClient;
import com.ssafy.hp.pill.PillRepository;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.pill.service.PillService;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.ssafy.hp.CountOutOfBoundsException.CALENDAR_OUT_OF_BOUNDS;
import static com.ssafy.hp.DuplicateException.CALENDAR_DUPLICATE;
import static com.ssafy.hp.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CalendarServiceImpl implements CalendarService{
    private final CalendarRepository calendarRepository;
    private final ExerciseRepository exerciseRepository;
    private final PillRepository pillRepository;
    private final CalendarQueryRepository calendarQueryRepository;
    private final ExerciseService exerciseService;
    private final PillService pillService;
    private final FirebaseClient firebaseClient;

    @Override
    // 회원의 요일별 영양제 & 운동 갯수 조회
    public List<CalendarCountListResponse> findListByCalendarDate(User user) {
        List<Calendar> findCalendars = calendarRepository.findByUsers(user);

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
    public void createCalendar(User user, CreateCalendarRequest request) {
        if(calendarRepository.countByCalendarDate(request.getCalendarDate()) >= 99){
            new CountOutOfBoundsException(CALENDAR_OUT_OF_BOUNDS);
        }
        if(request.getExerciseId() == null && request.getPillId() == null){
            new NotFoundException(EXERCISE_NOT_FOUND + PILL_NOT_FOUND);
        }

        Calendar findCalendar = null;
        if (request.getExerciseId() == null){
            Pill findPill = pillRepository.findById(request.getPillId())
                    .orElseThrow(() -> new NotFoundException(PILL_NOT_FOUND));
            if (calendarRepository.existsByCalendarDateAndUsersAndCalendarTime(request.getCalendarDate(), user, request.getCalendarTime())){
                throw new DuplicateException(CALENDAR_DUPLICATE);
            }
            pillService.updateUserPillByUserAndPill(user, request.getPillId(), YN.Y, 1);
            findCalendar = Calendar.createCalendar(request.getCalendarDate(), request.getCalendarTime(), request.getCalendarContent(), user, null, findPill);
        }
        else {
            Exercise findExercise = exerciseRepository.findById(request.getExerciseId())
                    .orElseThrow(() -> new NotFoundException(EXERCISE_NOT_FOUND));
            if (calendarRepository.existsByCalendarDateAndUsersAndCalendarTime(request.getCalendarDate(), user, request.getCalendarTime())){
                throw new DuplicateException(CALENDAR_DUPLICATE);
            }
            exerciseService.updateUserExerciseByUserAndExercise(user, request.getExerciseId(), YN.Y, 1);
            findCalendar = Calendar.createCalendar(request.getCalendarDate(), request.getCalendarTime(), request.getCalendarContent(), user, findExercise, null);
        }
        calendarRepository.save(findCalendar);
    }

    @Transactional
    @Override
    // 일정 수정
    public void updateCalendar(User user, Integer calendarId, UpdateCalendarRequest request) {
        Calendar calendar = calendarRepository.findById(calendarId)
                .orElseThrow(() -> new DuplicateException(CALENDAR_DUPLICATE));

        // 완전히 다른 일정인데 시간을 원래 등록되어있는 시간으로 바꿀때 에러처리
        // 원래 일정인데 내용만 수정했을때 바뀌도록 하는 처리 calendarId 5 -> ㄲ 4:30 -> ㄴㄴ 4:30
        Optional<Calendar> findCalendar = calendarRepository.findByCalendarDateAndUsersAndCalendarTime(calendar.getCalendarDate(), user, request.getCalendarTime());
        if(findCalendar.isPresent() && findCalendar.get().getCalendarId() != calendarId){
            throw new DuplicateException(CALENDAR_DUPLICATE);
        }

        calendar.updateCalendar(request.getCalendarContent(), request.getCalendarTime());
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

    //매주 일요일 0시 0분 정각에 수행
    @Scheduled(cron = "0 0 0 * * 0")
    @Transactional
    public void deleteAll() {
        calendarRepository.deleteAll();
    }

    // 5분 전에 일정 수행하라고 알림
    @Scheduled(cron = "0 * * * * *")
    @Transactional
    public void sendNotificationCalendar(){
        List<Calendar> findCalendars = calendarQueryRepository.findByCalendarTimeAndNotificationSend();
        calendarQueryRepository.updateNotificationSend(findCalendars);
        findCalendars
                .forEach(calendar -> firebaseClient.send(calendar.getUsers().getFcmToken(), calendar.getUsers().getUserNickname() + "님! 일정을 수행해주세요!"));
    }


    // 일정시간 후에 1시간 지나도 미완료상태일때 -> 일정 수행하라고 알림
    @Scheduled(cron = "0 * * * * *")
    @Transactional
    public void sendNotificationNotCompleteCalendar(){
        List<Calendar> findCalendars = calendarQueryRepository.findByCalendarTimeAndCalendarCompleteAndCompleteSend();
        calendarQueryRepository.updateCompleteSend(findCalendars);

        findCalendars
                .forEach(calendar -> firebaseClient.send(calendar.getUsers().getFcmToken(), calendar.getUsers().getUserNickname() + "님! 아직 완료되지 않은 일정이 있습니다!"));

    }
}
