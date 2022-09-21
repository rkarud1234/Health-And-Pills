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
    @GetMapping("/pill/best")
    public ResponseEntity<JSONObject> recommendPillBest(@LoginUser User user) {
        JSONObject body = recommendService.recommendPill("/pill/best");
        return ResponseEntity.ok().body(body);
    }
    // 사용자 맞춤 영양제 추천
    @GetMapping("/pill/custom")
    public ResponseEntity<JSONObject> recommendPillCustom(@LoginUser User user) {
        JSONObject body = recommendService.recommendPill("/pill/best");
        return ResponseEntity.ok().body(body);
    }
    // 유사한 사용자 영양제 추천
    @GetMapping("pill/user")
    public ResponseEntity<JSONObject> recommendPillItem(@LoginUser User user) {
        JSONObject body = recommendService.recommendPill("/pill/best");
        return ResponseEntity.ok().body(body);
    }
    // 현재 영양제와 유사한 영양제 추천
    @GetMapping("pill/item/{pill_id}")
    public ResponseEntity<JSONObject> recommendPillBest(@LoginUser User user, @PathVariable String pill_id) {
        JSONObject body = recommendService.recommendPill("/pill/best", pill_id);
        return ResponseEntity.ok().body(body);
    }
    // 베스트 영양제 추천
    @GetMapping("/exercise/best")
    public ResponseEntity<JSONObject> recommendExerciseBest(@LoginUser User user) {
        JSONObject body = recommendService.recommendExercise("/exercise/best");
        return ResponseEntity.ok().body(body);
    }
    // 사용자 맞춤 영양제 추천
    @GetMapping("/exercise/custom")
    public ResponseEntity<JSONObject> recommendExerciseCustom(@LoginUser User user) {
        JSONObject body = recommendService.recommendExercise("/exercise/best");
        return ResponseEntity.ok().body(body);
    }
    // 유사한 사용자 영양제 추천
    @GetMapping("exercise/user")
    public ResponseEntity<JSONObject> recommendExerciseItem(@LoginUser User user) {
        JSONObject body = recommendService.recommendExercise("/exercise/best");
        return ResponseEntity.ok().body(body);
    }
    // 현재 영양제와 유사한 영양제 추천
    @GetMapping("exercise/item/{exericse_id}")
    public ResponseEntity<JSONObject> recommendExerciseBest(@LoginUser User user, @PathVariable String exercise_id) {
        JSONObject body = recommendService.recommendExercise("/exercise/best", exercise_id);
        return ResponseEntity.ok().body(body);
    }
}
