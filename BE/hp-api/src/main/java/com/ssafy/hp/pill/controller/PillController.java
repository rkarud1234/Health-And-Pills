package com.ssafy.hp.pill.controller;

import com.ssafy.hp.config.LoginUser;
import com.ssafy.hp.exercise.request.ExerciseCheckRequest;
import com.ssafy.hp.pill.request.PillCheckRequest;
import com.ssafy.hp.pill.request.PillReviewRequest;
import com.ssafy.hp.pill.request.SearchRequest;
import com.ssafy.hp.pill.response.PillDetailResponse;
import com.ssafy.hp.pill.response.PillListResponse;
import com.ssafy.hp.pill.response.PillReviewListResponse;
import com.ssafy.hp.pill.service.PillServiceImpl;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/pills")
@RestController
@RequiredArgsConstructor
public class PillController {

    private static final int CMD_TAKING = 1;
    private static final int CMD_BOOKMARK = 2;


    private final PillServiceImpl pillService;

    // 영양제 검색
    @GetMapping("/search")
    public ResponseEntity<Page<PillListResponse>> search(@PageableDefault Pageable page, @Valid SearchRequest request) {

        Page<PillListResponse> body = pillService.findBySearchFilter(request, page);

        return ResponseEntity.ok().body(body);
    }

    // 영양제 디테일 조회
    @GetMapping("/{pill_id}")
    public ResponseEntity<PillDetailResponse> findOne(@PathVariable int pill_id) {
        PillDetailResponse body = pillService.findByPillId(pill_id);
        return ResponseEntity.ok().body(body);
    }

    // 리뷰 작성
    @PostMapping("/{pill_id}/review")
    public ResponseEntity<Void> createReview(@LoginUser User user, @PathVariable int pill_id, @RequestBody @Valid PillReviewRequest request) {
        pillService.createReview(user, pill_id, request);
        return ResponseEntity.ok().build();
    }
    
    // 리뷰 목록 조회
    @GetMapping("/{pill_id}/review")
    public ResponseEntity<Page<PillReviewListResponse>> getReviewList(@PageableDefault Pageable page, @PathVariable int pill_id) {
        Page<PillReviewListResponse> body = pillService.getReviews(pill_id, page);
        return ResponseEntity.ok().body(body);
    }

    // 리뷰 수정
    @PutMapping("/review/{review_id}")
    public ResponseEntity<Void> updateReview(@LoginUser User user, @PathVariable int review_id, @RequestBody @Valid PillReviewRequest request) {
        pillService.updateReview(user, review_id, request);
        return ResponseEntity.ok().build();
    }

    // 리뷰 삭제
    @DeleteMapping("/review/{review_id}")
    public ResponseEntity<Void> deleteReview(@LoginUser User user, @PathVariable int review_id) {
        pillService.deleteReview(user, review_id);
        return ResponseEntity.ok().build();
    }

    // 이미지 검색

    // 복용중 상태 변경
    @PostMapping("/taking")
    public ResponseEntity<Void> updateUserPillTakingByPill(@LoginUser User user, @RequestBody @Valid PillCheckRequest request) {
        pillService.updateUserPillByUserAndPill(user, request.getPillId(), request.getCheck(), CMD_TAKING);
        return ResponseEntity.ok().build();
    }

    // 영양제 북마크 상태 변경
    @PostMapping("/bookmark")
    public ResponseEntity<Void> updateUserPillBookmarkByPill(@LoginUser User user, @RequestBody @Valid PillCheckRequest request) {
        pillService.updateUserPillByUserAndPill(user, request.getPillId(), request.getCheck(), CMD_BOOKMARK);
        return ResponseEntity.ok().build();
    }

}
