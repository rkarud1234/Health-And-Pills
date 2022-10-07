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
public class UserEvent extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_event_id")
    private Integer userEventId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User users;


    public static UserEvent createUserEvent(User user) {
        UserEvent userEvent = new UserEvent();
        userEvent.users = user;
        return userEvent;
    }

}