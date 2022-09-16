package com.ssafy.hp.user.controller;

import com.ssafy.hp.config.LoginUser;
import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.request.UpdateUserExerciseRequest;
import com.ssafy.hp.user.request.UpdateUserInbodyRequest;
import com.ssafy.hp.user.response.*;
import com.ssafy.hp.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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

    // 나의 운동중 운동리스트 조회
    @GetMapping("/exercise")
    public ResponseEntity<Page<UserExerciseResponse>> findTakingExerciseByUserId(@LoginUser User user,
                                                                                 @PageableDefault(size = 15) Pageable pageable){
        Page<UserExerciseResponse> body = userService.findTakingExerciseByUserId(user.getUserId(), pageable);
        return ResponseEntity.ok().body(body);
    }

    // 나의 북마크 운동리스트 조회
    @GetMapping("/exercise/bookmark")
    public ResponseEntity<Page<UserExerciseResponse>> findBookmarkExerciseByUserId(@LoginUser User user,
                                                                                   @PageableDefault(size = 15) Pageable pageable){
        Page<UserExerciseResponse> body = userService.findBookmarkExerciseByUserId(user.getUserId(), pageable);
        return ResponseEntity.ok().body(body);
    }

    // 나의 좋아요 운동리스트 조회
    @GetMapping("/like")
    public ResponseEntity<Page<UserExerciseResponse>> findLikeExerciseByUserId(@LoginUser User user,
                                                                               @PageableDefault(size = 15) Pageable pageable){
        Page<UserExerciseResponse> body = userService.findLikeExerciseByUserId(user.getUserId(), pageable);
        return ResponseEntity.ok().body(body);
    }


    // 나의 복용중 영양제리스트 조회
    @GetMapping("/pill")
    public ResponseEntity<Page<UserPillResponse>> findTakingPillByUserId(@LoginUser User user,
                                                                         @PageableDefault(size = 15) Pageable pageable){
        Page<UserPillResponse> body = userService.findTakingPillByUserId(user.getUserId(), pageable);
        return ResponseEntity.ok().body(body);
    }

    // 나의 북마크 영양제리스트 조회
    @GetMapping("/pill/bookmark")
    public ResponseEntity<Page<UserPillResponse>> findBookmarkPillByUserId(@LoginUser User user,
                                                                           @PageableDefault(size = 15) Pageable pageable){
        Page<UserPillResponse> body = userService.findBookmarkPillByUserId(user.getUserId(), pageable);
        return ResponseEntity.ok().body(body);
    }

    // 나의 평점&리뷰 영양제리스트 조회
    @GetMapping("/review")
    public ResponseEntity<Page<UserReviewPillResponse>> findReviewPillByUserId(@LoginUser User user,
                                                                               @PageableDefault(size = 15) Pageable pageable){
        Page<UserReviewPillResponse> body = userService.findReviewPillByUserId(user.getUserId(), pageable);
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
