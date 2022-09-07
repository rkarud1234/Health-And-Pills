package com.ssafy.hp.pill.domain;

import com.ssafy.hp.common.BaseEntity;
import com.ssafy.hp.common.type.YN;
import com.sun.istack.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Pill extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pill_id")
    private int pillId;

    @NotNull
    private String pillName;

    @NotNull
    private String pillCompanyName;

    private LocalDateTime pillExpirationDate;

    private String pillTakeProcess;

    private String pillTakeWarning;

    private String pillContent;

    private String pillThumbnail;

    @Enumerated(EnumType.STRING)
    private YN pillDomestic;

    @OneToMany(mappedBy = "pill", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PillNutrient> pillNutrients = new ArrayList<>();

    @OneToMany(mappedBy = "pill", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PillWarning> pillWarnings = new ArrayList<>();
}

