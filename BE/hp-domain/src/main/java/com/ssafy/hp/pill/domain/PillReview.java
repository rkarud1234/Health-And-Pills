package com.ssafy.hp.pill.domain;

import com.ssafy.hp.common.BaseEntity;
import com.ssafy.hp.user.domain.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class PillReview extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pill_review_id")
    private Integer pillReviewId;

    private int pillReviewScore;

    private String pillReviewContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pill_id")
    private Pill pill;

    public static PillReview createPillReview(User user, Pill pill, int score, String content) {
        PillReview pillReview = new PillReview();
        pillReview.users = user;
        pillReview.pill = pill;
        pillReview.pillReviewScore = score;
        pillReview.pillReviewContent = content;
        return pillReview;
    }

    public void updatePillReview(int score, String content) {
        this.pillReviewScore = score;
        this.pillReviewContent = content;
    }

}
