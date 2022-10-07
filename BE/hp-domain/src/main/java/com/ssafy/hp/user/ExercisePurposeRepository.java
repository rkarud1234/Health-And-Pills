package com.ssafy.hp.user;

import com.ssafy.hp.user.domain.ExercisePurpose;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExercisePurposeRepository  extends JpaRepository<ExercisePurpose, Integer> {
}
