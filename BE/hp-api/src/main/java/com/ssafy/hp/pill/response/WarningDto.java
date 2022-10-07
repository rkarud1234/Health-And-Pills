package com.ssafy.hp.pill.response;

import com.ssafy.hp.pill.domain.Warning;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WarningDto {

    private Integer warningId;
    private String warningContent;

    public static WarningDto from(Warning warning) {
        WarningDto warningDto = new WarningDto();
        warningDto.warningId = warning.getWarningId();
        warningDto.warningContent = warning.getWarningContent();

        return warningDto;
    }
}
