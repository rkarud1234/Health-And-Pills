package com.ssafy.hp.user.domain;

import com.ssafy.hp.common.BaseEntity;
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
public class UserProfile extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_profile_id")
    private Integer userId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_profile_id")
    private User users;

    @NotNull
    private String userProfileNickname;

    @NotNull
    private String userProfileBirthday;

    @NotNull
    private String userProfileGender;

    private double userProfileHeight;

    private double userProfileWeight;

    private double userProfileFat;

    private double userProfileSkeleton;

    private double userProfileWater;

    @NotNull
    private int exerciseTimes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_purpose_id")
    private ExercisePurpose exercisePurpose;

    // 운동목적 & 운동횟수 수정
    public void updateUserExercise(ExercisePurpose  exercisePurpose, int exerciseTimes) {
        this.exercisePurpose = exercisePurpose;
        this.exerciseTimes = exerciseTimes;
    }

    // 인바디 수정
    public void updateUserInbody(double userProfileHeight, double userProfileWeight, double userProfileFat, double userProfileSkeleton, double userProfileWater) {
        this.userProfileHeight = userProfileHeight;
        this.userProfileWeight = userProfileWeight;
        this.userProfileFat = userProfileFat;
        this.userProfileSkeleton = userProfileSkeleton;
        this.userProfileWater = userProfileWater;
    }

}
