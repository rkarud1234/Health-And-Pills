package com.ssafy.hp.user.service;

import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.oauth.OAuth2UserInfo;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;

public interface UserService {

    // 기존 회원인지 신규 회원인지 판단
    OAuth2User proccessOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User);

    // 신규 회원 등록
    User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo);
}
