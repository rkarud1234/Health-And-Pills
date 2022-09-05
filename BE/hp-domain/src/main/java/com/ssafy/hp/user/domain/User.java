package com.ssafy.hp.user.domain;


import com.ssafy.hp.common.BaseEntity;
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

    private String userName;

    private String userProvider;

    private String userProviderId;

    @Enumerated(EnumType.STRING)
    private Role role;

    public static User createUser(Role role) {
        User user = new User();
        user.role = role;
        return user;
    }

}