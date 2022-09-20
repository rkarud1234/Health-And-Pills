package com.ssafy.hp.pill.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class PillNutrient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pill_nutrient_id")
    private Integer pillNutrientId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pill_id")
    private Pill pill;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nutrient_id")
    private Nutrient nutrient;
}
