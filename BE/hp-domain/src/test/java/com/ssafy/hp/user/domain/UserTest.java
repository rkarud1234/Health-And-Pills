package com.ssafy.hp.user.domain;

import com.ssafy.hp.user.domain.type.Provider;
import com.ssafy.hp.user.domain.type.Role;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    @DisplayName("회원을 생성한다.")
    void createUser() {
        //given
        Provider userProvider = Provider.google;
        String userProviderId = "109764055816357512970";
        String userName = "google_109764055816357512970";
        Role role = Role.ROLE_USER;
        String userNickname = "한싸피";


        //when
        User result = User.createUser(userProvider, userProviderId, userName, role, userNickname);

        //then
        assertThat(result.getUserProvider()).isEqualTo(userProvider);
        assertThat(result.getUserProviderId()).isEqualTo(userProviderId);
        assertThat(result.getUserName()).isEqualTo(userName);
        assertThat(result.getRole()).isEqualTo(role);
        assertThat(result.getUserNickname()).isEqualTo(userNickname);
    }
}