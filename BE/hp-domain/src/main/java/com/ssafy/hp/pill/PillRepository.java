package com.ssafy.hp.pill;

import com.ssafy.hp.pill.domain.Pill;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface PillRepository extends JpaRepository<Pill, Integer> {



    long countByPillNameContaining(String pillName); // 검색 결과에 맞는 영양제 갯수
    long count(); // 영양제 전체 갯수
    List<Pill> findByPillNameContaining(String pillName, Pageable page); // 영양제 이름 검색
    List<Pill> findAll(); // 영양제 전체 검색

    Optional<Pill> findByPillId(int pillId);



}
