package com.ssafy.hp.pill.response;

import com.ssafy.hp.pill.domain.Functionality;
import com.ssafy.hp.pill.domain.Nutrient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NutrientListResponse {
    // 생리활성 기능 번호
    Integer nutrientId;
    // 생리활성 기능 내용
    String nutrientName;

    public static NutrientListResponse from(Nutrient nutrient) {
        return new NutrientListResponse(
                nutrient.getNutrientId(),
                nutrient.getNutrientName()
        );
    }

}
