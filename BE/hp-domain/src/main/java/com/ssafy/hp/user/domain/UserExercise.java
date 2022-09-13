package com.ssafy.hp.user.domain;

import com.ssafy.hp.common.BaseEntity;
import com.ssafy.hp.common.type.YN;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class UserExercise extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_exercise_id")
    private int userExerciseId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User users;

    @Enumerated(EnumType.STRING)
    private YN userExerciseDoing;

    @Enumerated(EnumType.STRING)
    private YN userExerciseLike;

    @Enumerated(EnumType.STRING)
    private YN userExerciseBookmark;
}
