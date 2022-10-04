package com.ssafy.hp.pill;

import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.pill.domain.PillReview;
import com.ssafy.hp.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PillReviewRepository extends JpaRepository<PillReview, Integer> {

    List<PillReview> findByPill(Pill pill);

    Page<PillReview> findByUsers(User user, Pageable pageable);

    int countByPillPillId(Integer pillId);

    List<PillReview> findByPillPillId(Integer pillId);
}
