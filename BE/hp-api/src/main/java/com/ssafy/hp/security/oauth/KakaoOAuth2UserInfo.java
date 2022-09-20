package com.ssafy.hp.security.oauth;

import com.ssafy.hp.user.domain.type.*;

import java.util.*;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    private Map<String, Object> attributesAccount;
    private Map<String, Object> attributesProfile;


    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
        this.attributesAccount = (Map<String, Object>) attributes.get("kakao_account");
        this.attributesProfile = (Map<String, Object>) attributesAccount.get("profile");
    }

    @Override
    public String getUserNickname() {
        return attributesProfile.get("nickname").toString();
    }


    @Override
    public Provider getUserProvider() {
        return Provider.kakao;
    }

    @Override
    public String getUserName() {
        return getUserProvider() + "_" + getUserProviderId();
    }

    @Override
    public String getUserProviderId() {
        return String.valueOf(attributes.get("id"));
    }
}
