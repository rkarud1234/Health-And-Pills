package com.ssafy.hp.pill.domain;

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
public class Nutrient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nutrient_id")
    private int nutrientId;

    @NotNull
    private String nutrientName;

    @OneToMany(mappedBy = "nutrient", cascade = CascadeType.ALL)
    private List<PillNutrient> pillNutrients = new ArrayList<>();
}
