package com.ssafy.hp.user.response;

import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.pill.domain.PillReview;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReviewPillResponse {
    //리뷰번호 영양제번호 영양제이름 영양제사진 영양제리뷰내용 내가기입한별점
    private Integer id;
    private Integer relatedItemId;
    private String name;
    private String img;
    private String reviewContent;
    private double rating;

    public static UserReviewPillResponse from(PillReview pillReview){
        UserReviewPillResponse userReviewPillResponse = new UserReviewPillResponse();
        userReviewPillResponse.id = pillReview.getPillReviewId();
        userReviewPillResponse.relatedItemId = pillReview.getPill().getPillId();
        userReviewPillResponse.name = pillReview.getPill().getPillName();
        userReviewPillResponse.img = pillReview.getPill().getPillThumbnail();
        userReviewPillResponse.reviewContent = pillReview.getPillReviewContent();
        userReviewPillResponse.rating = pillReview.getPillReviewScore();
        return userReviewPillResponse;
    }
}
