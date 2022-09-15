package com.ssafy.hp.user.controller;

import com.ssafy.hp.auth.response.TokenResponse;
import com.ssafy.hp.config.LoginUser;
import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.request.UpdateUserExerciseRequest;
import com.ssafy.hp.user.request.UpdateUserInbodyRequest;
import com.ssafy.hp.user.response.UserExerciseResponse;
import com.ssafy.hp.user.response.UserInfoResponse;
import com.ssafy.hp.user.response.UserPillResponse;
import com.ssafy.hp.user.response.UserReviewResponse;
import com.ssafy.hp.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/api/users")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // 내정보 조회 (기본정보, 운동목적, 운동횟수, 인바디)
    // 조인 해야함
    @GetMapping
    public ResponseEntity<UserInfoResponse> findUser(@LoginUser User user){
        UserInfoResponse body = userService.findUser(user.getUserId());
        return ResponseEntity.ok().body(body);
    }

    // 타회원 정보 조회
    @GetMapping("/{user_id}")
    public ResponseEntity<UserInfoResponse> findById(@PathVariable("user_id") int userId){
        return null;
    }

    // 나의 운동중, 좋아요, 북마크 한 운동정보 리스트 조회
    @GetMapping("/exercise")
    public ResponseEntity<List<UserExerciseResponse>> findExerciseByUserId(@LoginUser User user){
        List<UserExerciseResponse> body = userService.findExerciseByUserId(user.getUserId());
        return ResponseEntity.ok().body(body);
    }

    // 나의 복용중 북마크 한 영양제 정보 리스트 조회
    @GetMapping("/pill")
    public ResponseEntity<List<UserPillResponse>> findPillByUserId(@LoginUser User user){
        List<UserPillResponse> body = userService.findPillByUserId(user.getUserId());
        return ResponseEntity.ok().body(body);
    }

    // 나의 평점 & 리뷰 영양제 리스트 조회
    @GetMapping("/review")
    public ResponseEntity<List<UserReviewResponse>> findReviewByUserId(@LoginUser User user){
        List<UserReviewResponse> body = userService.findReviewByUserId(user.getUserId());
        return ResponseEntity.ok().body(body);
    }

    // 운동목적 & 운동횟수 수정
    @PutMapping("/exercise")
    public ResponseEntity<Void> updateUserExercise(@LoginUser User user,
                                             @RequestBody @Valid UpdateUserExerciseRequest request){
        userService.updateUserExercise(user.getUserId(), request);
        return ResponseEntity.ok().build();
    }

    // 인바디 수정
    @PutMapping("/inbody")
    public  ResponseEntity<Void> updateUserInbody(@LoginUser User user,
                                            @RequestBody @Valid UpdateUserInbodyRequest request){
        userService.updateUserInbody(user.getUserId(), request);
        return ResponseEntity.ok().build();
    }

    // 회원 로그아웃
    @PostMapping
    public ResponseEntity<Void> logout(@LoginUser User user){
        userService.logout(user.getUserId());
        return ResponseEntity.ok().build();
    }

    // 회원 탈퇴
    @DeleteMapping
    public ResponseEntity<Void> deleteUser(@LoginUser User user){
        userService.deleteUser(user.getUserId());
        return ResponseEntity.ok().build();
    }
}
