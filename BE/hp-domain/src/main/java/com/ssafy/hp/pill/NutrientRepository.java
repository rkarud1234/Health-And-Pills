package com.ssafy.hp.pill;

import com.ssafy.hp.pill.domain.Nutrient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NutrientRepository extends JpaRepository<Nutrient, Integer> {
    List<Nutrient> findAllByOrderByNutrientNameAsc();
}
