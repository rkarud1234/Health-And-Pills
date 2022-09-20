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
public class Functionality {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "functionality_id")
    private Integer functionality_id;

    @Column(nullable = false)
    private String functionality_content;

    @OneToMany(mappedBy = "functionality", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PillFunctionality> pillFunctionalities = new ArrayList<>();
}
