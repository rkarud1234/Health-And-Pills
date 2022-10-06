package com.ssafy.hp.user.domain;


import com.ssafy.hp.calendar.domain.Calendar;
import com.ssafy.hp.common.BaseEntity;
import com.ssafy.hp.pill.domain.PillReview;
import com.ssafy.hp.user.domain.type.Provider;
import com.ssafy.hp.user.domain.type.Role;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import reactor.util.annotation.Nullable;

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

    @Column(nullable = false)
    private String userName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Provider userProvider;

    @Column(nullable = false)
    private String userProviderId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private String userNickname;

    private String fcmToken;

    @OneToOne(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private UserProfile userProfile;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<UserExercise> userExercises = new ArrayList<>();

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<UserPill> userPills = new ArrayList<>();

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PillReview> pillReviews = new ArrayList<>();

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Calendar> calendars = new ArrayList<>();

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<UserEvent> userEvents = new ArrayList<>();


    public static User createUser(Provider userProvider, String userProviderId, String userName, Role role, String userNickname) {
        User user = new User();
        user.userProvider = userProvider;
        user.userProviderId = userProviderId;
        user.userName = userName;
        user.role = role;
        user.userNickname = userNickname;
        return user;
    }

    public void updateFcmToken(String fcmToken){
        this.fcmToken = fcmToken;
    }

}