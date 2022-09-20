package com.ssafy.hp.user.response;

import com.ssafy.hp.user.domain.UserPill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPillInfoResponse {
    private String pillTaking;
    private String pillBookmark;

    public static UserPillInfoResponse from(UserPill userPill){
        UserPillInfoResponse userPillInfoResponse = new UserPillInfoResponse();
        userPillInfoResponse.pillTaking = String.valueOf(userPill.getUserPillTaking());
        userPillInfoResponse.pillBookmark = String.valueOf(userPill.getUserPillBookmark());
        return userPillInfoResponse;
    }
}
