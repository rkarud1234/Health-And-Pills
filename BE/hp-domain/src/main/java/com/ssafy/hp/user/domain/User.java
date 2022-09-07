package com.ssafy.hp.user.domain;


import com.ssafy.hp.common.BaseEntity;
import com.ssafy.hp.user.domain.type.Provider;
import com.ssafy.hp.user.domain.type.Role;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Enumerated(EnumType.STRING)
    private Provider userProvider;

    private String userProviderId;

    private String userName;

    @Enumerated(EnumType.STRING)
    private Role role;

    public static User createUser(Provider userProvider, String userProviderId, String userName, Role role) {
        User user = new User();
        user.userProvider = userProvider;
        user.userProviderId = userProviderId;
        user.userName = userName;
        user.role = role;
        return user;
    }

}