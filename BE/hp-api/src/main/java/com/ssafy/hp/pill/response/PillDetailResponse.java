package com.ssafy.hp.pill.response;

import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.pill.domain.Warning;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PillDetailResponse {

    //영양제 번호
    int pillId;
    // 영양제 이름
    String pillName;
    // 영양제 회사 이름
    String pillCompanyName;
    // 유통기한
    String pillExpirationDate;
    // 복용량/복용방법
    String pillTakeProcess;
    // 복용시 주의사항
    String pillTakeWarning;
    // 기능성 내용
    String pillContent;
    // 썸네일 주소
    String pillThumbnail;
    //국내 여부
    YN pillDomestic;
    // 평점 평균
    double reviewAverage;
    // 평점 갯수
    int reviewCount;
    // 영양소
    List<String> nutrients;
    // 생리활성기능 리스트
    List<String> functionalities;
    List<Warning> warnings;


    //  pillId: 1,
    //    pillName: “노비락토 바이오”,
    //    pillCompanyName: “광동제약”,
    //    pillThumb: “naver…..”,
    //    pillTotalScore: 4.6,
    //    pillReviewCount: 100,
    //    pillTakeProcess: “섭취방법”,
    //    pillTakeWarning: “섭취시주의사항”,
    //    pillExperationDate: “유통기한”,
    //    pillDomestic: “Y”,
    //    pillContent: “영양제 컨텐츠”,
    //    nutirentList : [”비타민E”,”비타민C”],
    //    functionalites : [”장 건강”,],


    public static PillDetailResponse from(Pill pill, List<String> nutrients, List<String> functionalities, List<Warning> warnings) {
        return new PillDetailResponse(pill.getPillId(),
                pill.getPillName(),
                pill.getPillCompanyName(),
                pill.getPillExpirationDate(),
                pill.getPillTakeProcess(),
                pill.getPillTakeWarning(),
                pill.getPillContent(),
                pill.getPillThumbnail(),
                pill.getPillDomestic(),
                pill.getReviewAverage(),
                pill.getReviewCount(),
                nutrients,
                functionalities,
                warnings);
    }

}
