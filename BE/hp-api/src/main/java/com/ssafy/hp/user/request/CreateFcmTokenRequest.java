package com.ssafy.hp.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateFcmTokenRequest {
    @NotBlank(message = "FCM토큰은 필수값입니다.")
    private String fcmToken;
}
