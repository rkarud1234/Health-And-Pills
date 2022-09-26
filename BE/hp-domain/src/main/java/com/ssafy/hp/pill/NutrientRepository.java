package com.ssafy.hp.pill;

import com.ssafy.hp.pill.domain.Nutrient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NutrientRepository extends JpaRepository<Nutrient, Integer> {
}
