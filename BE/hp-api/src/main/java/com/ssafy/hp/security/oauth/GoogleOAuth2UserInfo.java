package com.ssafy.hp.security.oauth;

import com.ssafy.hp.user.domain.type.*;

import java.util.*;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getUserEmail() {
        return (String) attributes.get("email");
    }


    @Override
    public Provider getUserProvider() {
        return Provider.google;
    }

    @Override
    public String getUserName() {
        return getUserProvider() + "_" + getUserProviderId();
    }

    @Override
    public String getUserProviderId() {
        return (String) attributes.get("sub");
    }
}
