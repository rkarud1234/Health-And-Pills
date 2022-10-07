package com.ssafy.hp.pill.request;

import com.ssafy.hp.common.type.YN;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PillCheckRequest {
    private Integer pillId;

    private YN check;
}
