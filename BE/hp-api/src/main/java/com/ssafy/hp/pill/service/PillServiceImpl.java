package com.ssafy.hp.pill.service;

import com.ssafy.hp.InvalidException;
import com.ssafy.hp.NotFoundException;
import com.ssafy.hp.NotMatchException;
import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.pill.PillRepository;
import com.ssafy.hp.pill.ReviewRepository;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.pill.domain.PillReview;
import com.ssafy.hp.pill.query.PillQueryRepository;
import com.ssafy.hp.pill.request.PillReviewRequest;
import com.ssafy.hp.pill.request.SearchRequest;
import com.ssafy.hp.pill.response.PillDetailResponse;
import com.ssafy.hp.pill.response.PillListResponse;
import com.ssafy.hp.pill.response.PillReviewListResponse;
import com.ssafy.hp.pill.response.PillReviewResponse;
import com.ssafy.hp.user.UserPillRepository;
import com.ssafy.hp.user.UserRepository;
import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.domain.UserPill;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.ssafy.hp.NotFoundException.PILL_NOT_FOUND;
import static com.ssafy.hp.NotFoundException.USER_NOT_FOUND;


@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PillServiceImpl implements PillService {

    private static final int CMD_TAKING = 1;
    private static final int CMD_BOOKMARK = 2;

    private final PillRepository pillRepository;
    private final PillQueryRepository pillQueryRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final UserPillRepository userPillRepository;

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
        if (user.getUserId().equals(pillReview.getUsers().getUserId())) {
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
        if (!user.getUserId().equals(pillReview.getUsers().getUserId())) {
            throw new NotMatchException(NotMatchException.USER_NOT_MATCH);
        }
        reviewRepository.delete(pillReview);
    }

    // 단일 리뷰 조회
    @Override
    public PillReviewResponse getReview(int reviewId) {
        PillReview result = reviewRepository.findById(reviewId)
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

    @Override
    public void updateUserPillByUserAndPill(User user, Integer pillId, YN check, int cmd) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Pill pill = pillRepository.findById(pillId)
                .orElseThrow(() -> new NotFoundException(PILL_NOT_FOUND));

        Optional<UserPill> userPill = userPillRepository.findUserPillByUsersAndPill(user, pill);

        if (userPill.isPresent()) {
            // 이미 컬럼이 있으면 해당 컬럼을 업데이트 해주면 됨
            updateUserPillByCmd(userPill.get(), check, cmd);
        } else {
            UserPill newUserPill = UserPill.createUserPill(user, pill);
            updateUserPillByCmd(newUserPill, check, cmd);
            userPillRepository.save(newUserPill);
        }
    }

    private void updateUserPillByCmd(UserPill userPill, YN yn, int cmd) {
        if (cmd == CMD_TAKING) {
            userPill.updateUserPillTaking(yn);
        } else if (cmd == CMD_BOOKMARK) {
            userPill.updateUserPillBookmark(yn);
        } else {
            throw new InvalidException(InvalidException.INVALID_REQUEST);
        }
    }
}
