package com.ssafy.hp.security.oauth;

import lombok.*;
import org.springframework.security.core.*;
import org.springframework.security.core.userdetails.*;

import java.util.*;

@Setter
@Getter
public class LoginUserDetails extends User {

    private com.ssafy.hp.user.domain.User user;

    public LoginUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

}

