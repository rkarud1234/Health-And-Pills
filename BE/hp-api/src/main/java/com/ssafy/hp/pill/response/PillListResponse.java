package com.ssafy.hp.pill.response;


import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.util.ScoreUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PillListResponse {

    //영양제 번호
    int pillId;
    // 영양제 이름
    String pillName;
    // 영양제 회사 이름
    String pillCompanyName;
    // 영양제 썸네일
    String pillThumbnail;

    private int[] scores = new int[6];
    private int pillReviewCount;
    private double pillReviewAverage;

    public static PillListResponse from(Pill pill, int[] scores) {
        PillListResponse pillListResponse = new PillListResponse();
        pillListResponse.pillId = pill.getPillId();
        pillListResponse.pillName = pill.getPillName();
        pillListResponse.pillCompanyName = pill.getPillCompanyName();
        pillListResponse.pillThumbnail = pill.getPillThumbnail();

        pillListResponse.scores = scores;
        pillListResponse.pillReviewCount = Arrays.stream(scores).sum();
        pillListResponse.pillReviewAverage = ScoreUtil.calculateAverage(scores);

        return pillListResponse;
    }
}
