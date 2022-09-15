package com.ssafy.hp.pill;

import com.ssafy.hp.pill.domain.Pill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PillRepository extends JpaRepository<Pill, Integer> {
}
