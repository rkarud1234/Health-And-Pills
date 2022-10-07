package com.ssafy.hp.pill.response;

import com.ssafy.hp.pill.domain.PillReview;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PillReviewResponse {

    int reviewId;
    int reviewScore;
    String reviewContent;
    String nickName;
    int pillId;

    public static PillReviewResponse from(PillReview pillReview) {
        return new PillReviewResponse(
                pillReview.getPillReviewId(),
                pillReview.getPillReviewScore(),
                pillReview.getPillReviewContent(),
                pillReview.getUsers().getUserNickname(),
                pillReview.getPill().getPillId()
        );
    }
}
