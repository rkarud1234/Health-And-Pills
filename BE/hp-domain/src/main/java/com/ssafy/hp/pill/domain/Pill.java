package com.ssafy.hp.pill.domain;

import com.ssafy.hp.common.BaseEntity;
import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.user.domain.UserPill;
import com.sun.istack.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

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

    private String pillExpirationDate;

    @Column(columnDefinition = "TEXT")
    private String pillTakeProcess;
    
    @Column(columnDefinition = "TEXT")
    private String pillTakeWarning;

    @Column(columnDefinition = "TEXT")
    private String pillContent;

    private String pillThumbnail;

    @ColumnDefault("0")
    private int reviewCount;

    @ColumnDefault("0")
    private double reviewAverage;

    @Enumerated(EnumType.STRING)
    private YN pillDomestic;

    @OneToMany(mappedBy = "pill", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<UserPill> userPills = new ArrayList<>();

    @OneToMany(mappedBy = "pill", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PillNutrient> pillNutrients = new ArrayList<>();

    @OneToMany(mappedBy = "pill", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PillWarning> pillWarnings = new ArrayList<>();

    @OneToMany(mappedBy = "pill", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PillReview> pillReviews = new ArrayList<>();
}

