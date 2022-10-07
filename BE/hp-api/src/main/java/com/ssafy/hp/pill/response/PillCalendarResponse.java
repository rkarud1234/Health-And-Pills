package com.ssafy.hp.pill.response;

import com.ssafy.hp.pill.domain.Pill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PillCalendarResponse {
    private Integer pillId;

    private String pillName;

    public static PillCalendarResponse from(Pill pill) {
        PillCalendarResponse pillCalendarResponse = new PillCalendarResponse();
        pillCalendarResponse.pillId = pill.getPillId();
        pillCalendarResponse.pillName = pill.getPillName();
        return pillCalendarResponse;
    }
}
