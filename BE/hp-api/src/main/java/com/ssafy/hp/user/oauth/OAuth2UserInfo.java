package com.ssafy.hp.user.oauth;

import com.ssafy.hp.user.domain.type.Provider;

import javax.persistence.Embeddable;
import java.util.Map;


@Embeddable
public abstract class OAuth2UserInfo {
    public OAuth2UserInfo() {

    }
}
