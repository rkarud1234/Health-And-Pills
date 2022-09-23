package com.ssafy.hp.pill.service;

import com.ssafy.hp.NotFoundException;
import com.ssafy.hp.NotMatchException;
import com.ssafy.hp.pill.PillRepository;
import com.ssafy.hp.pill.ReviewRepository;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.pill.domain.PillReview;
import com.ssafy.hp.pill.query.PillQueryRepository;
import com.ssafy.hp.pill.request.PillReviewRequest;
import com.ssafy.hp.pill.request.SearchRequest;
import com.ssafy.hp.pill.response.PillListResponse;
import com.ssafy.hp.pill.response.PillDetailResponse;
import com.ssafy.hp.pill.response.PillReviewListResponse;
import com.ssafy.hp.pill.response.PillReviewResponse;
import com.ssafy.hp.user.UserRepository;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PillServiceImpl implements PillService {
    private final PillRepository pillRepository;
    private final PillQueryRepository pillQueryRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

//    private String[] findPillNutrientByPill(Pill pill) {
//        return pillQueryRepository.
//    }

    // 검색조건에 맞는 영양제 반환
    @Override
    @Transactional
    public Page<PillListResponse> findBySearchFilter(SearchRequest request, Pageable pageable) {
        return pillQueryRepository.findBySearchFilter(request, pageable)
                .map(pill -> PillListResponse.from(pill));
    }

    // 영양제 디테일 정보 조회
    @Override
    public PillDetailResponse findByPillId(int pillId) {
        Pill pill = pillRepository.findById(pillId)
                .orElseThrow(() -> new NotFoundException("메세지"));
        return PillDetailResponse.from(pill, pillQueryRepository.findNutrientByPill(pill), pillQueryRepository.findWarningByPill(pill));
    }


    // 리뷰 작성
    @Override
    @Transactional
    public void createReview(User user, int pillId, PillReviewRequest request) {
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        Pill findPill = pillRepository.findById(pillId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.PILL_NOT_FOUND));

        PillReview newPillReview = PillReview.createPillReview(findUser, findPill, request.getScore(), request.getContent());
        reviewRepository.save(newPillReview);
    }

    // 리뷰 업데이트
    @Override
    @Transactional
    public void updateReview(User user, int reviewId, PillReviewRequest request) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        PillReview pillReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.REVIEW_NOT_FOUND));

        // 글 작성자와 업데이트 요청한 유저가 다르면
        if(user.getUserId().equals(pillReview.getUsers().getUserId())) {
            throw new NotMatchException(NotMatchException.USER_NOT_MATCH);
        }
        pillReview.updatePillReview(request.getScore(), request.getContent());
    }

    // 리뷰 삭제
    @Override
    @Transactional
    public void deleteReview(User user, int reviewId) {
       userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        PillReview pillReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.REVIEW_NOT_FOUND));
        // 글 작성자와 업데이트 요청한 유저가 다르면
        if(user.getUserId().equals(pillReview.getUsers().getUserId())) {
            throw new NotMatchException(NotMatchException.USER_NOT_MATCH);
        }
        reviewRepository.delete(pillReview);
    }

    // 단일 리뷰 조회
    @Override
    public PillReviewResponse getReview(int reviewId) {
        PillReview result =reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.REVIEW_NOT_FOUND));
        return PillReviewResponse.from(result);
    }

    // 모든 리뷰 조회
    @Override
    public Page<PillReviewListResponse> getReviews(int pillId, Pageable pageable) {
        return pillQueryRepository.findReviewByPillId(pillId, pageable)
                .map(PillReviewListResponse::from);
    }

    // 내가 작성한 리뷰 조회
    @Override
    public Page<PillReviewListResponse> getMyReviews(User user, Pageable pageable) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        return reviewRepository.findByUsers(user, pageable)
                .map(PillReviewListResponse::from);
    }
    
}
