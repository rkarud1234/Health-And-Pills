package com.ssafy.hp.user.query;

import com.querydsl.core.QueryResults;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hp.pill.domain.PillReview;
import com.ssafy.hp.user.UserProfileRepository;
import com.ssafy.hp.user.domain.*;
import com.ssafy.hp.user.response.QUserInbodyAverageResponse;
import com.ssafy.hp.user.response.UserInbodyAverageResponse;
import com.ssafy.hp.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.hp.common.type.YN.Y;
import static com.ssafy.hp.exercise.domain.QExercise.exercise;
import static com.ssafy.hp.pill.domain.QPill.pill;
import static com.ssafy.hp.pill.domain.QPillReview.pillReview;
import static com.ssafy.hp.user.domain.QUserExercise.*;
import static com.ssafy.hp.user.domain.QUserPill.userPill;
import static com.ssafy.hp.user.domain.QUserProfile.userProfile;

@Repository
@RequiredArgsConstructor
public class UserQueryRepository {
    private final JPAQueryFactory queryFactory;

    public Page<UserExercise> findTakingExerciseByUserId(User user, Pageable pageable){
        QueryResults<UserExercise> result = queryFactory
                .select(userExercise)
                .from(userExercise)
                .join(userExercise.exercise, exercise).fetchJoin()
                .where(userExercise.users.eq(user),
                        userExercise.userExerciseDoing.eq(Y)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<UserExercise> content = result.getResults();
        long total = result.getTotal();
        return new PageImpl<>(content, pageable, total);
    }

    public Page<UserExercise> findBookmarkExerciseByUserId(User user, Pageable pageable){
        QueryResults<UserExercise> result = queryFactory
                .select(userExercise)
                .from(userExercise)
                .join(userExercise.exercise, exercise).fetchJoin()
                .where(userExercise.users.eq(user),
                        userExercise.userExerciseBookmark.eq(Y)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<UserExercise> content = result.getResults();
        long total = result.getTotal();
        return new PageImpl<>(content, pageable, total);
    }

    public Page<UserExercise> findLikeExerciseByUserId(User user, Pageable pageable){
        QueryResults<UserExercise> result = queryFactory
                .select(userExercise)
                .from(userExercise)
                .join(userExercise.exercise, exercise).fetchJoin()
                .where(userExercise.users.eq(user),
                        userExercise.userExerciseLike.eq(Y)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<UserExercise> content = result.getResults();
        long total = result.getTotal();
        return new PageImpl<>(content, pageable, total);
    }

    public Page<UserPill> findTakingPillByUserId(User user, Pageable pageable){
        QueryResults<UserPill> result = queryFactory
                .selectFrom(userPill)
                .join(userPill.pill, pill).fetchJoin()
                .where(userPill.users.eq(user),
                        userPill.userPillTaking.eq(Y)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<UserPill> content = result.getResults();
        long total = result.getTotal();
        return new PageImpl<>(content, pageable, total);
    }

    public Page<UserPill> findBookmarkPillByUserId(User user, Pageable pageable){
        QueryResults<UserPill> result = queryFactory
                .selectFrom(userPill)
                .join(userPill.pill, pill).fetchJoin()
                .where(userPill.users.eq(user),
                        userPill.userPillBookmark.eq(Y)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<UserPill> content = result.getResults();
        long total = result.getTotal();
        return new PageImpl<>(content, pageable, total);
    }

    public Page<PillReview> findReviewPillByUserId(User user, Pageable pageable){
        QueryResults<PillReview> result = queryFactory
                .selectFrom(pillReview)
                .join(pillReview.pill, pill).fetchJoin()
                .where(pillReview.users.eq(user))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<PillReview> content = result.getResults();
        long total = result.getTotal();
        return new PageImpl<>(content, pageable, total);
    }

    public UserInbodyAverageResponse findAverageInbody(String userGender, String userBirthday){
        String [] birthYears = DateUtil.calculateAge(userBirthday);

        UserInbodyAverageResponse userInbodyAverageResponse = queryFactory
                .select(new QUserInbodyAverageResponse(
                        userProfile.userProfileHeight.avg(),
                        userProfile.userProfileWeight.avg(),
                        userProfile.userProfileFat.avg(),
                        userProfile.userProfileSkeleton.avg(),
                        userProfile.userProfileWater.avg()))
                .from(userProfile)
                .where(
                        userProfile.userProfileGender.eq(userGender),
                        userProfile.userProfileBirthday.between(birthYears[1], birthYears[0])
                ).fetchOne();

        return userInbodyAverageResponse;
    }
}
