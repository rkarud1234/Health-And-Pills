package com.ssafy.hp.user.domain;


import com.ssafy.hp.common.BaseEntity;
import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.pill.domain.Pill;
import com.sun.istack.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class UserPill extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_pill_id")
    private int userPillId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pill_id")
    private Pill pill;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private YN userPillTaking;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private YN userPillBookmark;
}
