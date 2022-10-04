package com.ssafy.hp.exercise.domain;

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
public class ExerciseCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_category_id")
    private Integer exerciseCategoryId;

    @Column(nullable = false)
    private String exerciseCategoryName;

    @OneToMany(mappedBy = "exerciseCategory", fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<Exercise> exercises = new ArrayList<>();


}
