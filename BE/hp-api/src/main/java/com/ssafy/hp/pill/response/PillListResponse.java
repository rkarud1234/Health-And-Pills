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

    public static PillListResponse from(PillListResponse pillListResponse) {
        return new PillListResponse(pillListResponse.getPillId(), pillListResponse.getPillName(), pillListResponse.getPillCompanyName(), pillListResponse.getPillThumbnail());
    }

    public static PillListResponse from(Pill pill) {
        return new PillListResponse(pill.getPillId(), pill.getPillName(), pill.getPillCompanyName(), pill.getPillThumbnail());
    }


}
