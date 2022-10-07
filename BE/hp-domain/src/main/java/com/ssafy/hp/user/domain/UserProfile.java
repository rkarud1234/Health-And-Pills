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
public class UserProfile extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_profile_id")
    private Integer userId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_profile_id")
    private User users;

    @Column(nullable = false)
    private String userProfileNickname;

    @Column(nullable = false)
    private String userProfileBirthday;

    @Column(nullable = false)
    private String userProfileGender;

    private double userProfileHeight;

    private double userProfileWeight;

    private double userProfileFat;

    private double userProfileSkeleton;

    private double userProfileWater;

    @Column(nullable = false)
    private int exerciseTimes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_purpose_id")
    private ExercisePurpose exercisePurpose;

    // 필수정보 등록
    public static UserProfile createUserProfile(User user, String userProfileNickname, String userProfileBirthday, String userProfileGender, int exerciseTimes, ExercisePurpose exercisePurpose){
        UserProfile userProfile = new UserProfile();
        userProfile.users = user;
        userProfile.userProfileNickname = userProfileNickname;
        userProfile.userProfileBirthday = userProfileBirthday;
        userProfile.userProfileGender = userProfileGender;
        userProfile.exerciseTimes = exerciseTimes;
        userProfile.exercisePurpose = exercisePurpose;
        return userProfile;
    }

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
