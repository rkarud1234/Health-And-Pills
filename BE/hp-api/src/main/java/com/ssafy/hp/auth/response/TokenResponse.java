package com.ssafy.hp.auth.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponse {
    @NotBlank(message = "ACCESS토큰은 필수값입니다.")
    private String accessToken;
    @NotBlank(message = "REFRESH토큰은 필수값입니다.")
    private String refreshToken;

}