package com.ssafy.hp.pill.domain;

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
public class Functionality {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "functionality_id")
    private Integer functionalityId;

    @Column(nullable = false)
    private String functionalityContent;

    @OneToMany(mappedBy = "functionality", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PillFunctionality> pillFunctionalities = new ArrayList<>();
}
