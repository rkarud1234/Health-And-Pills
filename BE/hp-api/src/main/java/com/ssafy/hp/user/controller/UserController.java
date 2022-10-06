package com.ssafy.hp.user.controller;

import com.ssafy.hp.config.LoginUser;
import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.request.CreateUserProfileRequest;
import com.ssafy.hp.user.request.UpdateUserExerciseRequest;
import com.ssafy.hp.user.request.UpdateUserInbodyRequest;
import com.ssafy.hp.user.response.*;
import com.ssafy.hp.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/api/users")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    //fcm 토큰 받기
    @PostMapping("/fcm")
    public ResponseEntity<Void> createFcmToken(@LoginUser User user, @RequestBody String fcmToken){
        userService.createFcmToken(user, fcmToken);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 필수정보 등록 (이름, 생년월일, 성별, 운동목적, 운동횟수)
    @PostMapping
    public ResponseEntity<Void> createUserProfile(@LoginUser User user, @RequestBody @Valid CreateUserProfileRequest request) {
        userService.createUserProfile(user, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 내정보 조회 (기본정보, 운동목적, 운동횟수, 인바디)
    // 조인 해야함
    @GetMapping
    public ResponseEntity<UserInfoResponse> findUser(@LoginUser User user){
        UserInfoResponse body = userService.findUser(user);
        return ResponseEntity.ok().body(body);
    }

    // 타회원 정보 조회
    @GetMapping("/{user_id}")
    public ResponseEntity<UserInfoResponse> findById(@PathVariable("user_id") int userId){
        return null;
    }

    // 나의 운동중 운동리스트 조회
    @GetMapping("/exercise")
    public ResponseEntity<Page<UserExerciseResponse>> findTakingExerciseByUser(@LoginUser User user,
                                                                                 @PageableDefault(size = 15) Pageable pageable){
        Page<UserExerciseResponse> body = userService.findTakingExerciseByUser(user, pageable);
        return ResponseEntity.ok().body(body);
    }

    // 나의 북마크 운동리스트 조회
    @GetMapping("/exercise/bookmark")
    public ResponseEntity<Page<UserExerciseResponse>> findBookmarkExerciseByUser(@LoginUser User user,
                                                                                   @PageableDefault(size = 15) Pageable pageable){
        Page<UserExerciseResponse> body = userService.findBookmarkExerciseByUser(user, pageable);
        return ResponseEntity.ok().body(body);
    }

    // 나의 좋아요 운동리스트 조회
    @GetMapping("/like")
    public ResponseEntity<Page<UserExerciseResponse>> findLikeExerciseByUser(@LoginUser User user,
                                                                               @PageableDefault(size = 15) Pageable pageable){
        Page<UserExerciseResponse> body = userService.findLikeExerciseByUser(user, pageable);
        return ResponseEntity.ok().body(body);
    }


    // 해당 운동에대한 나의 정보 (운동중여부, 북마크여부, 좋아요 여부)
    @GetMapping("/exercise/{exercise_id}")
    public ResponseEntity<UserExerciseInfoResponse> findByExercise(@LoginUser User user,
                                                                     @PathVariable("exercise_id") int exerciserId){
        UserExerciseInfoResponse body = userService.findByExercise(user, exerciserId);
        return ResponseEntity.ok().body(body);
    }

    // 나의 복용중 영양제리스트 조회
    @GetMapping("/pill")
    public ResponseEntity<Page<UserPillResponse>> findTakingPillByUser(@LoginUser User user,
                                                                         @PageableDefault(size = 15) Pageable pageable){
        Page<UserPillResponse> body = userService.findTakingPillByUser(user, pageable);
        return ResponseEntity.ok().body(body);
    }

    // 나의 북마크 영양제리스트 조회
    @GetMapping("/pill/bookmark")
    public ResponseEntity<Page<UserPillResponse>> findBookmarkPillByUser(@LoginUser User user,
                                                                           @PageableDefault(size = 15) Pageable pageable){
        Page<UserPillResponse> body = userService.findBookmarkPillByUser(user, pageable);
        return ResponseEntity.ok().body(body);
    }

    // 나의 평점&리뷰 영양제리스트 조회
    @GetMapping("/review")
    public ResponseEntity<Page<UserReviewPillResponse>> findReviewPillByUser(@LoginUser User user,
                                                                               @PageableDefault(size = 15) Pageable pageable){
        Page<UserReviewPillResponse> body = userService.findReviewPillByUser(user, pageable);
        return ResponseEntity.ok().body(body);
    }

    // 해당 영양제에 대한 나의 정보 조회 (복용중여부, 북마크여부)
    @GetMapping("/pill/{pill_id}")
    public ResponseEntity<UserPillInfoResponse> findByPill(@LoginUser User user,
                                                             @PathVariable("pill_id") int pillId){
        UserPillInfoResponse body = userService.findByPill(user, pillId);
        return ResponseEntity.ok().body(body);
    }

    // 운동목적 & 운동횟수 수정
    @PutMapping("/exercise")
    public ResponseEntity<Void> updateUserExercise(@LoginUser User user,
                                             @RequestBody @Valid UpdateUserExerciseRequest request){
        userService.updateUserExercise(user, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 내정보 인바디정보 등록&수정
    @PutMapping("/inbody")
    public  ResponseEntity<Void> updateUserInbody(@LoginUser User user,
                                            @RequestBody @Valid UpdateUserInbodyRequest request){
        userService.updateUserInbody(user, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //회원의 성별, 나잇대에 따른 인바디 평균 값(키, 몸무게, 체지방량, 골격근량, 체수분량)
    @GetMapping("/inbody")
    public ResponseEntity<UserInbodyAverageResponse> findUserInbodyAverage(@LoginUser User user){
        UserInbodyAverageResponse body = userService.findUserInbodyAverage(user);
        return ResponseEntity.ok().body(body);
    }

    // 회원 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@LoginUser User user){
        userService.logout(user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 회원 탈퇴
    @DeleteMapping
    public ResponseEntity<Void> deleteUser(@LoginUser User user){
        userService.deleteUser(user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 신체검사 count 이벤트
    @PostMapping("/event")
    public ResponseEntity<Integer> createUserEvent(@LoginUser User user) {
        Integer body = userService.createUserEvent(user);
        return ResponseEntity.ok().body(body);
    }

}
