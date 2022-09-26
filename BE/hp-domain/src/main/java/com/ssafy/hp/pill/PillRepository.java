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
    long count(); // 영양제 전체 갯수
    List<Pill> findAll(); // 영양제 전체 검색



}
