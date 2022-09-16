package com.ssafy.hp.user.query;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hp.pill.domain.PillReview;
import com.ssafy.hp.user.domain.UserExercise;
import com.ssafy.hp.user.domain.UserPill;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.hp.common.type.YN.Y;
import static com.ssafy.hp.pill.domain.QPill.pill;
import static com.ssafy.hp.pill.domain.QPillReview.pillReview;
import static com.ssafy.hp.user.domain.QUserPill.userPill;

@Repository
@RequiredArgsConstructor
public class UserQueryRepository {
    private final JPAQueryFactory queryFactory;

    public Page<UserExercise> findTakingExerciseByUserId(int userId, Pageable pageable){
        return null;
    }

    public Page<UserExercise> findBookmarkExerciseByUserId(int userId, Pageable pageable){
        return null;
    }

    public Page<UserExercise> findLikeExerciseByUserId(int userId, Pageable pageable){
        return null;
    }

    public Page<UserPill> findTakingPillByUserId(int userId, Pageable pageable){
        QueryResults<UserPill> result = queryFactory
                .selectFrom(userPill)
                .join(userPill.pill, pill).fetchJoin()
                .where(userPill.users.userId.eq(userId),
                        userPill.userPillTaking.eq(Y)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<UserPill> content = result.getResults();
        long total = result.getTotal();
        return new PageImpl<>(content, pageable, total);
    }

    public Page<UserPill> findBookmarkPillByUserId(int userId, Pageable pageable){
        QueryResults<UserPill> result = queryFactory
                .selectFrom(userPill)
                .join(userPill.pill, pill).fetchJoin()
                .where(userPill.users.userId.eq(userId),
                        userPill.userPillBookmark.eq(Y)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<UserPill> content = result.getResults();
        long total = result.getTotal();
        return new PageImpl<>(content, pageable, total);
    }

    public Page<PillReview> findReviewPillByUserId(int userId, Pageable pageable){
        QueryResults<PillReview> result = queryFactory
                .selectFrom(pillReview)
                .join(pillReview.pill, pill).fetchJoin()
                .where(pillReview.users.userId.eq(userId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<PillReview> content = result.getResults();
        long total = result.getTotal();
        return new PageImpl<>(content, pageable, total);
    }
}
