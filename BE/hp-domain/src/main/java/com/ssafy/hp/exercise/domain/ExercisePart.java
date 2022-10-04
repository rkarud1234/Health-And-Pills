package com.ssafy.hp.exercise.domain;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class ExercisePart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_part_id")
    private Integer exercisePartId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="exercise_part_category_id")
    private ExercisePartCategory exercisePartCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="exercise_id")
    private Exercise exercise;
}
