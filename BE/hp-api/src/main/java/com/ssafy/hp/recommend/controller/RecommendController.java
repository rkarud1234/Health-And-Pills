package com.ssafy.hp.recommend.controller;

import com.ssafy.hp.config.LoginUser;
import com.ssafy.hp.recommend.service.RecommendServiceImpl;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/recommend")
@RestController
@RequiredArgsConstructor
public class RecommendController {

    private final RecommendServiceImpl recommendService;
    
    // 베스트 영양제 추천
    @GetMapping("/pills/best")
    public ResponseEntity<JSONArray> recommendPillBest(@LoginUser User user) {
        JSONArray body = recommendService.recommendPill("/pills/best", user);
        return ResponseEntity.ok().body(body);
    }
    // 사용자 맞춤 영양제 추천
    @GetMapping("/pills/custom")
    public ResponseEntity<JSONArray> recommendPillCustom(@LoginUser User user) {
        JSONArray body = recommendService.recommendPill("/pills/custom", user);
        return ResponseEntity.ok().body(body);
    }
    // 유사한 사용자 영양제 추천
    @GetMapping("pills/user")
    public ResponseEntity<JSONArray> recommendPillItem(@LoginUser User user) {
        JSONArray body = recommendService.recommendPill("/pills/user", user);
        return ResponseEntity.ok().body(body);
    }
    // 현재 영양제와 유사한 영양제 추천
    @GetMapping("pills/item/{pill_id}")
    public ResponseEntity<JSONArray> recommendPillBest(@LoginUser User user, @PathVariable("pill_id") String pillId) {
        JSONArray body = recommendService.recommendPill("/pills/item", user, pillId);
        return ResponseEntity.ok().body(body);
    }
    // 베스트 영양제 추천
    @GetMapping("/exercises/best")
    public ResponseEntity<JSONArray> recommendExerciseBest(@LoginUser User user) {
        JSONArray body = recommendService.recommendExercise("/exercises/best", user);
        return ResponseEntity.ok().body(body);
    }
    // 사용자 맞춤 영양제 추천
    @GetMapping("/exercises/custom")
    public ResponseEntity<JSONArray> recommendExerciseCustom(@LoginUser User user) {
        JSONArray body = recommendService.recommendExercise("/exercises/custom", user);
        return ResponseEntity.ok().body(body);
    }
    // 유사한 사용자 영양제 추천
    @GetMapping("exercises/user")
    public ResponseEntity<JSONArray> recommendExerciseItem(@LoginUser User user) {
        JSONArray body = recommendService.recommendExercise("/exercises/user", user);
        return ResponseEntity.ok().body(body);
    }
    // 현재 영양제와 유사한 영양제 추천
    @GetMapping("exercises/item/{exercise_id}")
    public ResponseEntity<JSONArray> recommendExerciseBest(@LoginUser User user, @PathVariable("exercise_id") String exerciseId) {
        JSONArray body = recommendService.recommendExercise("/exercises/item", user, exerciseId);
        return ResponseEntity.ok().body(body);
    }
}
