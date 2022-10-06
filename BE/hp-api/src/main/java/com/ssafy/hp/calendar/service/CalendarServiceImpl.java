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
import com.ssafy.hp.user.UserExerciseRepository;
import com.ssafy.hp.user.UserPillRepository;
import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.domain.UserExercise;
import com.ssafy.hp.user.domain.UserPill;
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
        //controller
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
        Calendar findCalendar = calendarRepository.findById(calendarId)
                .orElseThrow(() -> new DuplicateException(CALENDAR_DUPLICATE));

        if(findCalendar.getExercise() == null){
            if(calendarRepository.existsByCalendarDateAndUsersAndCalendarTime(findCalendar.getCalendarDate(), user, request.getCalendarTime())){
                throw new DuplicateException(CALENDAR_DUPLICATE);
            }
        }
        else{
            if(calendarRepository.existsByCalendarDateAndUsersAndCalendarTime(findCalendar.getCalendarDate(), user, request.getCalendarTime())){
                throw new DuplicateException(CALENDAR_DUPLICATE);
            }
        }

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

    //매주 일요일 0시 0분 정각에 수행
    @Scheduled(cron = "0 0 0 * * 0")
    @Transactional
    public void deleteAll() {
        calendarRepository.deleteAll();
    }

    // 5분 전에 일정 수행하라고 알림
    @Scheduled(cron = "* * * * * *")
    @Transactional
    public void sendNotificationCalendar(){
        // 5분 이상 차이나면서 처리가 안된것 조회 (queryDsl)-> update 처리 (queryDsl 벌크성 쿼리)
        List<Calendar> findCalendars = calendarQueryRepository.findByCalendarTimeAndNotificationSend();
        calendarQueryRepository.updateNotificationSend(findCalendars);
        // 해당 애들의 fcm토큰으로 알림 보내기
        findCalendars
                .forEach(calendar -> firebaseClient.send(calendar.getUsers().getFcmToken(), calendar.getUsers().getUserNickname() + "님! 일정을 수행해주세요!"));
    }


    // 일정시간 후에 1시간 지나도 미완료상태일때 -> 일정 수행하라고 알림
    @Scheduled(cron = "* * * * * *")
    @Transactional
    public void sendNotificationNotCompleteCalendar(){
        // 1시간 이상 애들 중에 미완료 상태이고 알림이 안보내진것 조회 -> Update 처리
        List<Calendar> findCalendars = calendarQueryRepository.findByCalendarTimeAndCalendarCompleteAndCompleteSend();
        calendarQueryRepository.updateCompleteSend(findCalendars);
        // 해당 애들의 fcm토큰으로 알림 보내기
        findCalendars
                .forEach(calendar -> firebaseClient.send(calendar.getUsers().getFcmToken(), calendar.getUsers().getUserNickname() + "님! 아직 완료되지 않은 일정이 있습니다!"));

    }
}
