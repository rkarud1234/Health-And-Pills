package com.ssafy.hp.pill.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PillReviewRequest {
    int score;
    String content;
}
