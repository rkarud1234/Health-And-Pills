package com.ssafy.hp.user.response;

import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.user.domain.UserPill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPillResponse {
    private Integer id;
    private Integer relatedItemId;
    private String name;
    private double rating;
    private String img;

    public static UserPillResponse from(UserPill userPill){
        UserPillResponse userPillResponse = new UserPillResponse();
        userPillResponse.id = userPill.getUserPillId();
        userPillResponse.relatedItemId = userPill.getPill().getPillId();
        userPillResponse.name = userPill.getPill().getPillName();
        userPillResponse.img = userPill.getPill().getPillThumbnail();
        return userPillResponse;
    }
}
