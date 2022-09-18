package com.ssafy.hp.exercise.controller;

import com.ssafy.hp.config.*;
import com.ssafy.hp.exercise.request.*;
import com.ssafy.hp.exercise.response.*;
import com.ssafy.hp.exercise.service.*;
import com.ssafy.hp.user.domain.*;
import lombok.*;
import org.springframework.data.domain.*;
import org.springframework.data.web.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;

@RestController
@RequestMapping("/api/exercise")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;

    // 운동 종류별 조회
    @GetMapping("/category")
    ResponseEntity<Page<ExerciseListResponse>> findByExerciseCategory(@LoginUser User user, @RequestParam Integer category, @PageableDefault(size = 10) Pageable pageable) {
        Page<ExerciseListResponse> body = exerciseService.findByExerciseCategory(user, category, pageable);
        return ResponseEntity.ok().body(body);
    }

    // 운동 부위별 조회
    @GetMapping("/part")
    ResponseEntity<Page<ExerciseListResponse>> findByExercisePart(@LoginUser User user, @RequestParam Integer part, @PageableDefault(size = 10) Pageable pageable) {
        Page<ExerciseListResponse> body = exerciseService.findByExercisePart(user, part, pageable);
        return ResponseEntity.ok().body(body);
    }

    // 베스트 10 운동 추천

    // 000님을 위한 맞춤 추천

    // 00대 여성이 많이 하는 운동 추천

    // {스쿼트}와 유사한 운동 추천

    // 운동 상세정보 조회
    @GetMapping("/{exercise_id}")
    ResponseEntity<ExerciseDetailResponse> findByExerciseId(@LoginUser User user, @PathVariable("exercise_id") Integer exerciseId) {
        ExerciseDetailResponse body = exerciseService.findByExerciseId(user, exerciseId);
        return ResponseEntity.ok().body(body);
    }

    // 운동중 상태 변경
    @PostMapping("/doing")
    public ResponseEntity<Void> updateUserExerciseDoingByExercise(@LoginUser User user, @RequestBody @Valid ExerciseCheckRequest request) {
        System.out.println("ExerciseController.updateUserExerciseDoingByExercise");
        exerciseService.updateUserExerciseDoingByExercise(user, request.getExerciseId(), request.getCheck());
        return ResponseEntity.ok().build();
    }

    // 운동 좋아요 상태 변경

    // 운동 북마크 상태 변경

}
