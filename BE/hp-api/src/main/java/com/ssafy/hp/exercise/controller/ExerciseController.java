package com.ssafy.hp.exercise.controller;

import com.ssafy.hp.exercise.response.*;
import lombok.*;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exercise")
@RequiredArgsConstructor
public class ExerciseController {// 운동 종류별 조회
//    Page<ExerciseListResponse> findByExerciseCategory(@RequestParam Integer category, Pageable pageable);
//
//    // 운동 부위별 조회
//    Page<ExerciseListResponse> findByExercisePart(@RequestParam Integer part, Pageable pageable);

    // 베스트 10 운동 추천

    // 000님을 위한 맞춤 추천

    // 00대 여성이 많이 하는 운동 추천

    // {스쿼트}와 유사한 운동 추천

    // 운동 상세정보 조회
//    @GetMapping("/{exercise_id}")
//    ExerciseDetailResponse findByExerciseId(@PathVariable("exercise_id") Integer exerciseId);

}
