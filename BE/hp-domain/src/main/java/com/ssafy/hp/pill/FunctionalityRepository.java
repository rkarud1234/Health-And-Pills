package com.ssafy.hp.pill;

import com.ssafy.hp.pill.domain.Functionality;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FunctionalityRepository extends JpaRepository<Functionality, Integer> {
    List<Functionality> findAllByOrderByFunctionalityContentAsc();
}
