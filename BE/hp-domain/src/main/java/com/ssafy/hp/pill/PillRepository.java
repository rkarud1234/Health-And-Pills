package com.ssafy.hp.pill;

import com.ssafy.hp.pill.domain.Pill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PillRepository extends JpaRepository<Pill, Integer> {
    long count(); // 영양제 전체 갯수

    List<Pill> findAll(); // 영양제 전체 검색

    List<Pill> findTop10PillNameByPillNameContainingOrderByPillNameAsc(String pillName); // 검색어 미리보기


}
