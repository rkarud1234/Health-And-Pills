package com.ssafy.hp.pill.service;

import com.ssafy.hp.*;
import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.pill.FunctionalityRepository;
import com.ssafy.hp.pill.NutrientRepository;
import com.ssafy.hp.pill.PillRepository;
import com.ssafy.hp.pill.PillReviewRepository;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.pill.domain.PillReview;
import com.ssafy.hp.pill.query.PillQueryRepository;
import com.ssafy.hp.pill.request.PillReviewRequest;
import com.ssafy.hp.pill.request.SearchRequest;
import com.ssafy.hp.pill.response.*;
import com.ssafy.hp.user.UserPillRepository;
import com.ssafy.hp.user.UserRepository;
import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.domain.UserPill;
import com.ssafy.hp.user.response.UserPillInfoResponse;
import com.ssafy.hp.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.ssafy.hp.DuplicateException.REVIEW_DUPLICATE;
import static com.ssafy.hp.NotFoundException.*;
import static com.ssafy.hp.NotMatchException.USER_NOT_MATCH;


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
    private final PillReviewRepository pillReviewRepository;
    private final UserPillRepository userPillRepository;
    private final DetectText detectText;
    private final FunctionalityRepository functionalityRepository;
    private final NutrientRepository nutrientRepository;

    // 검색조건에 맞는 영양제 반환
    @Override
    @Transactional
    public Page<PillListResponse> findBySearchFilter(SearchRequest request, Pageable pageable) {
        return pillQueryRepository.findBySearchFilter(request, pageable)
                .map(pill -> PillListResponse.from(pill, findPillReviewScoresByPill(pill)));
    }

    // 영양제 디테일 정보 조회
    @Override
    public PillDetailResponse findByPillId(User user, int pillId) {
        Pill pill = pillRepository.findById(pillId)
                .orElseThrow(() -> new NotFoundException(PILL_NOT_FOUND));

        Pill findPill = pillRepository.findById(pillId)
                .orElseThrow(() -> new NotFoundException(PILL_NOT_FOUND));
        Optional<UserPill> findUserPill = userPillRepository.findUserPillByUsersAndPill(user, findPill);

        if (findUserPill.isEmpty()) {
            findUserPill = Optional.of(UserPill.createUserPill(user, findPill));
        }

        return PillDetailResponse.from(pill, findPillReviewScoresByPill(pill), UserPillInfoResponse.from(findUserPill.get()));
    }

    private int[] findPillReviewScoresByPill(Pill pill) {
        List<PillReview> pillReviews = pillReviewRepository.findByPill(pill);

        Map<Integer, List<PillReview>> findPillReviewsMap = pillReviews.stream()
                .collect(Collectors.groupingBy(PillReview::getPillReviewScore));

        int[] scores = new int[6];
        for (int key : findPillReviewsMap.keySet()) {
            scores[key] = findPillReviewsMap.get(key).size();
        }

        return scores;
    }

    // 리뷰 작성
    @Override
    @Transactional
    public void createReview(User user, int pillId, PillReviewRequest request) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Pill pill = pillRepository.findById(pillId)
                .orElseThrow(() -> new NotFoundException(PILL_NOT_FOUND));

        Optional<PillReview> pillReview = pillReviewRepository.findByUsersAndPill(user, pill);
        // 리뷰 한 명당 한 개만 등록
        if (pillReview.isPresent()) {
            throw new DuplicateException(REVIEW_DUPLICATE);
        }

        PillReview newPillReview = PillReview.createPillReview(user, pill, request.getScore(), request.getContent());
        pillReviewRepository.save(newPillReview);
    }

    // 리뷰 업데이트
    @Override
    @Transactional
    public void updateReview(User user, int reviewId, PillReviewRequest request) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        PillReview pillReview = pillReviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException(REVIEW_NOT_FOUND));

        // 글 작성자와 업데이트 요청한 유저가 다르면
        if (!user.getUserId().equals(pillReview.getUsers().getUserId())) {
            throw new NotMatchException(USER_NOT_MATCH);
        }
        Pill pill = pillRepository.findById(pillReview.getPill().getPillId())
                .orElseThrow(() -> new NotFoundException(PILL_NOT_FOUND));

        pillReview.updatePillReview(request.getScore(), request.getContent());
    }

    // 리뷰 삭제
    @Override
    @Transactional
    public void deleteReview(User user, int reviewId) {
        PillReview pillReview = pillReviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException(REVIEW_NOT_FOUND));
        // 글 작성자와 업데이트 요청한 유저가 다르면
        if (!user.getUserId().equals(pillReview.getUsers().getUserId())) {
            throw new NotMatchException(USER_NOT_MATCH);
        }

        Pill pill = pillRepository.findById(pillReview.getPill().getPillId())
                .orElseThrow(() -> new NotFoundException(PILL_NOT_FOUND));

        pillReviewRepository.delete(pillReview);
    }

    // 단일 리뷰 조회
    @Override
    public PillReviewResponse getReview(int reviewId) {
        PillReview result = pillReviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException(REVIEW_NOT_FOUND));
        return PillReviewResponse.from(result);
    }

    // 모든 리뷰 조회
    @Override
    public Page<PillReviewListResponse> getReviews(User user, int pillId, Pageable pageable) {
        return pillQueryRepository.findReviewByPillId(pillId, pageable)
                .map(pillReview -> PillReviewListResponse.from(
                                pillReview,
                                user.getUserId().equals(pillReview.getUsers().getUserId())
                        )
                );
    }

    // 내가 작성한 리뷰 조회
    @Override
    public Page<PillReviewListResponse> getMyReviews(User user, Pageable pageable) {
        return pillReviewRepository.findByUsers(user, pageable)
                .map(pillReview -> PillReviewListResponse.from(pillReview, true));
    }

    @Override
    public List<FunctionalityListResponse> findAllByOrderByFunctionalityContentAsc() {
        return functionalityRepository.findAllByOrderByFunctionalityContentAsc()
                .stream().map(FunctionalityListResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    public List<NutrientListResponse> findAllByOrderByNutrientNameAsc() {
        return nutrientRepository.findAllByOrderByNutrientNameAsc()
                .stream().map(NutrientListResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updateUserPillByUserAndPill(User user, Integer pillId, YN check, int cmd) {
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

    public VisionResponse getDetectText(String data) {
        try {
            String result = detectText.detectText(data.getBytes());
            return new VisionResponse(result, result);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<String> findTop10PillNameByPillNameContainingOrderByPillNameAsc(String keyword) {
        return pillRepository.findTop10PillNameByPillNameContainingOrderByPillNameAsc(keyword)
                .stream().map(Pill::getPillName).collect(Collectors.toList());
    }

    @Override
    public List<List<PillCalendarResponse>> findPillByUserPill(User user, String search) {
        return pillQueryRepository.findPillByUserPill(user, search);
    }
}
