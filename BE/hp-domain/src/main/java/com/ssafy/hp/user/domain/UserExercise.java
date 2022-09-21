package com.ssafy.hp.user.domain;

import com.ssafy.hp.common.BaseEntity;
import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.exercise.domain.Exercise;
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
public class UserExercise extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_exercise_id")
    private int userExerciseId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private YN userExerciseDoing;

    @Enumerated(EnumType.STRING)
    private YN userExerciseLike;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private YN userExerciseBookmark;

    public static UserExercise createUserExercise(User user, Exercise exercise) {
        UserExercise userExercise = new UserExercise();
        userExercise.users = user;
        userExercise.exercise = exercise;
        userExercise.userExerciseDoing = YN.N;
        userExercise.userExerciseLike = null;
        userExercise.userExerciseBookmark = YN.N;

        return userExercise;
    }

    public void updateUserExerciseDoing(YN doing) {
        this.userExerciseDoing = doing;
    }

    public void updateUserExerciseLike(YN like) {
        this.userExerciseLike = like;
    }

    public void updateUserExerciseBookmark(YN bookmark) {
        this.userExerciseBookmark = bookmark;
    }
}
