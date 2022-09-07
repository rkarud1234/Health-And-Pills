package com.ssafy.hp.exercise.domain;

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
public class ExercisePartCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_part_category_id")
    private int exercisePartCategoryId;

    private String exercisePartCategoryName;

    // 캐스케이드랑 feech lazy 달자
    @OneToMany(mappedBy = "exercisePartCategory", cascade = CascadeType.ALL)
    private List<ExercisePart> exerciseParts = new ArrayList<>();


}
