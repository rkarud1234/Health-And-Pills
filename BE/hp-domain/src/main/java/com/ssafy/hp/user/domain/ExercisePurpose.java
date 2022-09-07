package com.ssafy.hp.user.domain;

import com.ssafy.hp.user.domain.type.ExPurpose;
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
public class ExercisePurpose {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_purpose_id")
    private int exercisePurposeId;

    @Enumerated(EnumType.STRING)
    @NotNull
    private ExPurpose exercisePurposeName;

    @OneToMany(mappedBy = "exercisePurpose" ,cascade = CascadeType.ALL)
    private List<UserProfile> userProfiles = new ArrayList<>();

}
