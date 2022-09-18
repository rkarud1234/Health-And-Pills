package com.ssafy.hp.user.domain;


import com.ssafy.hp.common.BaseEntity;
import com.ssafy.hp.pill.domain.PillReview;
import com.ssafy.hp.user.domain.type.Provider;
import com.ssafy.hp.user.domain.type.Role;
import com.sun.istack.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @NotNull
    private String userName;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Provider userProvider;

    @NotNull
    private String userProviderId;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Role role;

    @OneToOne(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private UserProfile userProfile;

    @OneToMany(mappedBy = "users" ,cascade = CascadeType.ALL)
    private List<UserExercise> userExercises = new ArrayList<>();

    @OneToMany(mappedBy = "users" ,cascade = CascadeType.ALL)
    private List<UserPill> userPills = new ArrayList<>();

    @OneToMany(mappedBy = "users" ,cascade = CascadeType.ALL)
    private List<PillReview> pillReviews = new ArrayList<>();


    public static User createUser(Provider userProvider, String userProviderId, String userName, Role role) {
        User user = new User();
        user.userProvider = userProvider;
        user.userProviderId = userProviderId;
        user.userName = userName;
        user.role = role;
        return user;
    }

}