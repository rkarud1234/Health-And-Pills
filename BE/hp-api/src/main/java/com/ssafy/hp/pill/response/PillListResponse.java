package com.ssafy.hp.pill.response;


import com.ssafy.hp.pill.domain.Pill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    // 영양제 평점 평균
    double reviewAverage;
    // 영양제 평점 카운트
    int reviewCount;

    public static PillListResponse from(PillListResponse pillListResponse) {
        return new PillListResponse(pillListResponse.getPillId(), pillListResponse.getPillName(), pillListResponse.getPillCompanyName(), pillListResponse.getPillThumbnail(), pillListResponse.getReviewAverage(), pillListResponse.getReviewCount());
    }
    public static PillListResponse from(Pill pill) {
        return new PillListResponse(pill.getPillId(), pill.getPillName(), pill.getPillCompanyName(), pill.getPillThumbnail(), pill.getReviewAverage(), pill.getReviewCount());
    }


}
