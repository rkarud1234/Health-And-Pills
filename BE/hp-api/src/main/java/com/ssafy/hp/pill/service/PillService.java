package com.ssafy.hp.pill.service;


import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.pill.request.PillReviewRequest;
import com.ssafy.hp.pill.request.SearchRequest;
import com.ssafy.hp.pill.response.PillListResponse;
import com.ssafy.hp.pill.response.PillDetailResponse;
import com.ssafy.hp.pill.response.PillReviewListResponse;
import com.ssafy.hp.pill.response.PillReviewResponse;
import com.ssafy.hp.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface PillService {
    // 영양제 디테일 조회
    PillDetailResponse findByPillId(int pillId);

    // 영양제 검색 조회
    Page<PillListResponse> findBySearchFilter(SearchRequest request, Pageable pageable);

    // 리뷰 작성
    void createReview(User user, int pillId, PillReviewRequest request);

    // 리뷰 수정
    void updateReview(User user, int reviewId, PillReviewRequest request);

    // 리뷰 삭제
    void deleteReview(User user, int reviewId);

    // 단일 리뷰 조회
    PillReviewResponse getReview(int reviewId);

    // 영양제의 전체 리뷰 조회
    Page<PillReviewListResponse> getReviews(User user, int pillId, Pageable pageable);

    // 내가 작성한 리뷰 조회
    Page<PillReviewListResponse> getMyReviews(User user, Pageable pageable);

    // 북마크, 복용중 상태 변경
    void updateUserPillByUserAndPill(User user, Integer pillId, YN check, int cmd);

}
