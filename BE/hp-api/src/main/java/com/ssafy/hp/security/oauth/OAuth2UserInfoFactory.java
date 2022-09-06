package com.ssafy.hp.security.oauth;

import com.ssafy.hp.*;
import com.ssafy.hp.user.domain.type.*;

import java.util.*;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equals(Provider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equals(Provider.kakao.toString())) {
            return new KakaoOAuth2UserInfo(attributes);
        }  else {
            throw new OAuthProviderNotExistException(registrationId);
        }
    }
}
