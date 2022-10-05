package com.ssafy.hp.calendar.domain;

import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.exercise.domain.Exercise;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.user.domain.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "calendar_id")
    private Integer calendarId;

    private Integer calendarDate;
    //날짜로 저장

    private LocalTime calendarTime;

    private String calendarContent;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private YN calendarComplete;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private YN notificationSend;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private YN completeSend;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pill_id")
    private Pill pill;

    public static Calendar createCalendar(Integer calendarDate, LocalTime calendarTime,String calendarContent, User users, Exercise exercise, Pill pill){
        Calendar calendar = new Calendar();
        calendar.calendarDate = calendarDate;
        calendar.calendarTime = calendarTime;
        calendar.calendarContent = calendarContent;
        calendar.calendarComplete = YN.N;
        calendar.notificationSend = YN.N;
        calendar.completeSend = YN.N;
        calendar.users = users;
        calendar.exercise = exercise;
        calendar.pill = pill;
        return calendar;
    }

    public void updateCalendar(String calendarContent, LocalTime calendarTime){
        this.calendarContent = calendarContent;
        this.calendarTime = calendarTime;
    }

    public void updateCalendarComplete(YN yn){
        this.calendarComplete = yn;
    }
}
