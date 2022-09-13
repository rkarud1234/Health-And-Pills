package com.ssafy.hp.security.oauth;

import com.ssafy.hp.user.domain.*;
import com.ssafy.hp.user.domain.type.*;
import lombok.*;
import org.springframework.security.core.*;
import org.springframework.security.core.authority.*;
import org.springframework.security.oauth2.core.user.*;

import java.util.*;

@Data
public class CustomOAuth2User implements OAuth2User {

    private int userId;
    private Provider userProvider;
    private String userProviderId;
    private String userName;
    private Role role;

    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public CustomOAuth2User(int userId, Provider userProvider, String userProviderId, String userName, Role role, Collection<? extends GrantedAuthority> authorities) {
        this.userId = userId;
        this.userProvider = userProvider;
        this.userProviderId = userProviderId;
        this.userName = userName;
        this.role = role;
        this.authorities = authorities;
    }

    public static CustomOAuth2User create(User user, Map<String, Object> attributes) {
        List<GrantedAuthority> authorities = Collections.
                singletonList(new SimpleGrantedAuthority(String.valueOf(user.getRole())));
        CustomOAuth2User customOAuth2User = new CustomOAuth2User(user.getUserId(), user.getUserProvider(), user.getUserProviderId(), user.getUserName(), user.getRole(), authorities);
        customOAuth2User.setAttributes(attributes);

        return customOAuth2User;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return userName;
    }
}
