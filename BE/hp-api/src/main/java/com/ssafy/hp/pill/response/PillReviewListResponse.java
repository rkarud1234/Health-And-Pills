package com.ssafy.hp.pill.response;

import com.ssafy.hp.pill.domain.PillReview;
import com.ssafy.hp.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PillReviewListResponse {

    int reviewId;
    int reviewScore;
    String reviewContent;
    String nickName;

    public static PillReviewListResponse from(PillReview pillReview) {
        return new PillReviewListResponse(
                pillReview.getPillReviewId(),
                pillReview.getPillReviewScore(),
                pillReview.getPillReviewContent(),
                pillReview.getUsers().getUserNickname()
        );
    }
}
