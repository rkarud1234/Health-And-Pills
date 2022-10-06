package com.ssafy.hp.exercise.domain;

import com.ssafy.hp.calendar.domain.Calendar;
import com.ssafy.hp.common.BaseEntity;
import com.ssafy.hp.exercise.type.*;
import com.ssafy.hp.user.domain.UserExercise;
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
public class Exercise extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_id")
    private Integer exerciseId;

    @Column(nullable = false)
    private String exerciseName;

    @Column(nullable = false)
    private String exerciseContent;

    @OneToMany(mappedBy = "exercise", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ExercisePart> exerciseParts = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_category_id")
    private ExerciseCategory exerciseCategory;

    @Enumerated(EnumType.STRING)
    private Aerobic exerciseAerobic;

    @OneToMany(mappedBy = "exercise", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<UserExercise> userExercises = new ArrayList<>();

    @OneToMany(mappedBy = "exercise", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Calendar> calendars = new ArrayList<>();

}
