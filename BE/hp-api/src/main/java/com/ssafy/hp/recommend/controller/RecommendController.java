package com.ssafy.hp.recommend.controller;

import com.ssafy.hp.config.LoginUser;
import com.ssafy.hp.recommend.service.RecommendServiceImpl;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;

@RequestMapping("/api/recommend")
@RestController
@RequiredArgsConstructor
public class RecommendController {

    private final RecommendServiceImpl recommendService;
    
    // 베스트 영양제 추천
    @GetMapping("/pills/best")
    public ResponseEntity<JSONObject> recommendPillBest(@LoginUser User user) {
        JSONObject body = recommendService.recommendPill("/pills/best");
        return ResponseEntity.ok().body(body);
    }
    // 사용자 맞춤 영양제 추천
    @GetMapping("/pills/custom")
    public ResponseEntity<JSONObject> recommendPillCustom(@LoginUser User user) {
        JSONObject body = recommendService.recommendPill("/pills/custom");
        return ResponseEntity.ok().body(body);
    }
    // 유사한 사용자 영양제 추천
    @GetMapping("pills/user")
    public ResponseEntity<JSONObject> recommendPillItem(@LoginUser User user) {
        JSONObject body = recommendService.recommendPill("/pills/user");
        return ResponseEntity.ok().body(body);
    }
    // 현재 영양제와 유사한 영양제 추천
    @GetMapping("pills/item/{pill_id}")
    public ResponseEntity<JSONObject> recommendPillBest(@LoginUser User user, @PathVariable("pill_id") String pillId) {
        JSONObject body = recommendService.recommendPill("/pills/item", pillId);
        return ResponseEntity.ok().body(body);
    }
    // 베스트 영양제 추천
    @GetMapping("/exercises/best")
    public ResponseEntity<JSONObject> recommendExerciseBest(@LoginUser User user) {
        JSONObject body = recommendService.recommendExercise("/exercises/best");
        return ResponseEntity.ok().body(body);
    }
    // 사용자 맞춤 영양제 추천
    @GetMapping("/exercises/custom")
    public ResponseEntity<JSONObject> recommendExerciseCustom(@LoginUser User user) {
        JSONObject body = recommendService.recommendExercise("/exercises/custom");
        return ResponseEntity.ok().body(body);
    }
    // 유사한 사용자 영양제 추천
    @GetMapping("exercises/user")
    public ResponseEntity<JSONObject> recommendExerciseItem(@LoginUser User user) {
        JSONObject body = recommendService.recommendExercise("/exercises/user");
        return ResponseEntity.ok().body(body);
    }
    // 현재 영양제와 유사한 영양제 추천
    @GetMapping("exercises/item/{exericse_id}")
    public ResponseEntity<JSONObject> recommendExerciseBest(@LoginUser User user, @PathVariable("exercise_id") String exerciseId) {
        JSONObject body = recommendService.recommendExercise("/exercises/item", exerciseId);
        return ResponseEntity.ok().body(body);
    }
}
