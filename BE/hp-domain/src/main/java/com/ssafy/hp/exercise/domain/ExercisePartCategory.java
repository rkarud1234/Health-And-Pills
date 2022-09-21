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
    private Integer exercisePartCategoryId;

    private String exercisePartCategoryName;

    @OneToMany(mappedBy = "exercisePartCategory", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ExercisePart> exerciseParts = new ArrayList<>();


}
