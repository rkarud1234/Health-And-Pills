package com.ssafy.hp.security.service;

import com.ssafy.hp.*;
import com.ssafy.hp.auth.response.TokenResponse;
import com.ssafy.hp.auth.service.AuthService;
import com.ssafy.hp.security.oauth.*;
import com.ssafy.hp.user.*;
import com.ssafy.hp.user.domain.*;
import com.ssafy.hp.user.domain.type.*;
import io.micrometer.core.instrument.util.*;
import lombok.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.*;
import org.springframework.security.oauth2.client.userinfo.*;
import org.springframework.security.oauth2.core.*;
import org.springframework.security.oauth2.core.user.*;
import org.springframework.stereotype.*;

import java.util.*;

import static com.ssafy.hp.NotFoundException.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // OAuth로 넘어온 사용자 profile scope가 전처리되는 메서드
        OAuth2User oAuth2User = super.loadUser(userRequest);
        try {
            return proccessOAuth2User(userRequest, oAuth2User);
        } catch (AuthenticationException e) {
            throw e;
        } catch (Exception e) {
            // 여기서 예외가 던져지면 OAuth2AuthenticationFailureHandler에서 처리하게 됨
            throw new InternalAuthenticationServiceException(e.getMessage(), e.getCause());
        }
    }

    private OAuth2User proccessOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        // 기존 회원인지 신규 회원인지 판단
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());

        // 고유 아이디를 이용하여 가입 여부를 조회
        Optional<User> userOptional = userRepository.findByUserName(oAuth2UserInfo.getUserName());
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }
        return CustomOAuth2User.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        Provider userProvider = Provider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId());
//        String userEmail = oAuth2UserInfo.getUserEmail();
        String userProviderId = oAuth2UserInfo.getUserProviderId();
        String userName = oAuth2UserInfo.getUserName();

        User user = User.createUser(userProvider, userProviderId, userName, Role.ROLE_USER);

        return userRepository.save(user);
    }
}
