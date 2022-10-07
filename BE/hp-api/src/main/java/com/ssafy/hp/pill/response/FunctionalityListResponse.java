package com.ssafy.hp.pill.response;

import com.ssafy.hp.pill.domain.Functionality;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FunctionalityListResponse {
    // 생리활성 기능 번호
    Integer functionalityId;
    // 생리활성 기능 내용
    String functionalityContent;

    public static FunctionalityListResponse from(Functionality functionality) {
        return new FunctionalityListResponse(
                functionality.getFunctionalityId(),
                functionality.getFunctionalityContent()
        );
    }

}
