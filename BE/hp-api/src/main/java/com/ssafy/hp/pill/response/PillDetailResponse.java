package com.ssafy.hp.pill.response;

import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.pill.domain.PillWarning;
import com.ssafy.hp.pill.domain.Warning;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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
    // 영양소
    List<String> nutrients;
    // 생리활성기능 리스트
    List<String> functionalities;
    List<WarningDto> warnings;

    int[] scores = new int[6];
    int pillReviewCount;
    double pillReviewAverage;

    public static PillDetailResponse from(Pill pill, int[] scores) {
        PillDetailResponse pillDetailResponse = new PillDetailResponse();
        pillDetailResponse.pillId = pill.getPillId();
        pillDetailResponse.pillName = pill.getPillName();
        pillDetailResponse.pillCompanyName = pill.getPillCompanyName();
        pillDetailResponse.pillExpirationDate = pill.getPillExpirationDate();
        pillDetailResponse.pillTakeProcess = pill.getPillTakeProcess();
        pillDetailResponse.pillTakeWarning = pill.getPillTakeWarning();
        pillDetailResponse.pillContent = pill.getPillContent();
        pillDetailResponse.pillThumbnail = pill.getPillThumbnail();
        pillDetailResponse.pillDomestic = pill.getPillDomestic();

        pillDetailResponse.nutrients = pill.getPillNutrients().stream()
                .map(pillNutrient -> pillNutrient.getNutrient().getNutrientName())
                .collect(Collectors.toList());

        pillDetailResponse.functionalities = pill.getPillFunctionalities().stream()
                .map(pillFunctionality -> pillFunctionality.getFunctionality().getFunctionalityContent())
                .collect(Collectors.toList());

        pillDetailResponse.warnings = pill.getPillWarnings().stream()
                .map(pillWarning -> WarningDto.from(pillWarning.getWarning()))
                .collect(Collectors.toList());

        pillDetailResponse.scores = scores;
        pillDetailResponse.pillReviewCount = Arrays.stream(scores).sum();
        int sum = 0;
        for (int i = 1; i < scores.length; i++) {
            sum += scores[i];
        }
        pillDetailResponse.pillReviewAverage = pillDetailResponse.pillReviewCount == 0 ? 0 : (double) sum / pillDetailResponse.pillReviewCount;

        return pillDetailResponse;
    }
}
