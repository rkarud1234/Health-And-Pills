package com.ssafy.hp.calendar.domain;

import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.exercise.domain.Exercise;
import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.domain.type.Provider;
import com.ssafy.hp.user.domain.type.Role;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;

import static com.ssafy.hp.common.type.YN.N;
import static com.ssafy.hp.common.type.YN.Y;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class CalendarTest {
    public static final Integer ID = 1;
    private static final LocalTime TIME = null;
    public static final User user = User.createUser(Provider.google, "109764055816357512970", "google_109764055816357512970", Role.ROLE_USER, "한싸피");


    @Test
    @DisplayName("일정을 등록한다.")
    void createCalendar() {
        // given

        // when
        Calendar result = Calendar.createCalendar(ID, TIME, null, user, null, null);

        // then
        assertThat(result.getCalendarDate()).isEqualTo(ID);
        assertThat(result.getCalendarTime()).isEqualTo(TIME);
        assertThat(result.getCalendarContent()).isEqualTo(null);
        assertThat(result.getUsers()).isEqualTo(user);
        assertThat(result.getExercise()).isEqualTo(null);
        assertThat(result.getPill()).isEqualTo(null);

    }

    @Test
    @DisplayName("일정을 수정한다.")
    void updateCalendar() {
        // given
        Calendar result = Calendar.createCalendar(ID, TIME, null, user, null, null);

        // when
        result.updateCalendar(null, TIME);

        // then
        assertThat(result.getCalendarContent()).isEqualTo(null);
        assertThat(result.getCalendarTime()).isEqualTo(TIME);
    }

    @Test
    @DisplayName("일정 완료/완료 해제한다.")
    void updateCalendarComplete() {
        // given
        Calendar result = Calendar.createCalendar(ID, TIME, null, user, null, null);

        // when
        result.updateCalendarComplete(Y);

        // then
        assertThat(result.getCalendarComplete()).isEqualTo(Y);
    }
}