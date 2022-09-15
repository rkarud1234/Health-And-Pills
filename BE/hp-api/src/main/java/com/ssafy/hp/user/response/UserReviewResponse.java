package com.ssafy.hp.user.response;

import com.ssafy.hp.pill.domain.PillReview;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReviewResponse {
    //리뷰번호 영양제번호 리뷰점수 리뷰내용 생성일
    private int userPillId;

    private int pillId;

    private int pillReviewScore;

    private String pillReviewContent;

    private LocalDateTime createDate;

    public static UserReviewResponse from(PillReview pillReview){
        UserReviewResponse userReviewResponse = new UserReviewResponse();
        userReviewResponse.userPillId = pillReview.getPillReviewId();
        userReviewResponse.pillId = pillReview.getPill().getPillId();
        userReviewResponse.pillReviewScore = pillReview.getPillReviewScore();
        userReviewResponse.pillReviewContent = pillReview.getPillReviewContent();
        userReviewResponse.createDate = pillReview.getCreatedDate();
        return userReviewResponse;
    }
}
