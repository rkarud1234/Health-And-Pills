package com.ssafy.hp.user.response;

import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.user.domain.UserPill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPillResponse {
    // 회원영양제번호 영양제번호 복용중여부 북마크여부
    private int userPillId;

    private int pillId;

    private YN userPillTaking;

    private YN userPillBookmark;

    public static UserPillResponse from(UserPill userPill){
        UserPillResponse userPillResponse = new UserPillResponse();
        userPillResponse.userPillId = userPill.getUserPillId();
        userPillResponse.pillId = userPill.getPill().getPillId();
        userPillResponse.userPillTaking = userPill.getUserPillTaking();
        userPillResponse.userPillBookmark = userPill.getUserPillBookmark();
        return userPillResponse;
    }
}
