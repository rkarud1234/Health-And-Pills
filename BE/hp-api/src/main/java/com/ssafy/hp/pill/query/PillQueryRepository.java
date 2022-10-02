package com.ssafy.hp.pill.query;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.pill.domain.PillReview;
import com.ssafy.hp.pill.domain.Warning;
import com.ssafy.hp.pill.request.SearchRequest;
import com.ssafy.hp.pill.response.PillCalendarResponse;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.ssafy.hp.pill.domain.QNutrient.nutrient;
import static com.ssafy.hp.pill.domain.QPill.pill;
import static com.ssafy.hp.pill.domain.QPillNutrient.pillNutrient;
import static com.ssafy.hp.pill.domain.QPillWarning.pillWarning;
import static com.ssafy.hp.pill.domain.QPillFunctionality.pillFunctionality;
import static com.ssafy.hp.pill.domain.QWarning.warning;
import static com.ssafy.hp.pill.domain.QPillReview.pillReview;
import static com.ssafy.hp.user.domain.QUserPill.userPill;
import static com.ssafy.hp.pill.domain.QFunctionality.functionality;

@Repository
@RequiredArgsConstructor
public class PillQueryRepository {

    private final JPAQueryFactory queryFactory;


    public Page<Pill> findBySearchFilter(SearchRequest request, Pageable pageable) {
        Integer[] materials = new Integer[0];
        Integer[] functionalities = new Integer[0];

        if (!request.getMaterials().equals("")) {
            materials = Stream.of(request.getMaterials().split(",")).mapToInt(Integer::parseInt).boxed().toArray(Integer[]::new);
        }

        if (!request.getFunctionalities().equals("")) {
            functionalities = Stream.of(request.getFunctionalities().split(",")).mapToInt(Integer::parseInt).boxed().toArray(Integer[]::new);
        }

        // 1-1. 영양소 서브쿼리
        List<Integer> materialResults = queryFactory
                .select(pill.pillId).distinct()
                .from(pillNutrient)
                .leftJoin(pill)
                .on(pill.eq(pillNutrient.pill))
                .where(pillNutrient.nutrient.nutrientId.in(materials))
                .fetch();

        // 1-2. 기능 서브쿼리
        List<Integer> functionalityResults = queryFactory
                .select(pill.pillId).distinct()
                .from(pillFunctionality)
                .leftJoin(pill)
                .on(pill.eq(pillFunctionality.pill))
                .where(pillFunctionality.functionality.functionalityId.in(functionalities))
                .fetch();


        // 2. 빈 조건에 대해서는 where 조건절 적용X
        BooleanBuilder builder = new BooleanBuilder();
        if (materialResults.size() > 0) {
            builder.and(pill.pillId.in(materialResults));
        }
        if (functionalityResults.size() > 0) {
            builder.and(pill.pillId.in(functionalityResults));
        }
        if (!request.getSearch().isEmpty()) {
            builder.and(pill.pillName.contains(request.getSearch()));
        }
        if (request.getDomestic() != null) {
            builder.and(pill.pillDomestic.eq(request.getDomestic()));
        }

        List<Pill> results = queryFactory
                .selectFrom(pill)
                .where(builder)
                .orderBy(pill.pillId.asc())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(results);
    }

    // 영양제에 포함된 기능성 원료(영양소) 반환
    public List<String> findNutrientByPill(Pill pill) {
        return queryFactory
                .select(nutrient.nutrientName)
                .from(nutrient)
                .join(pillNutrient)
                .on(nutrient.eq(pillNutrient.nutrient))
                .where(pillNutrient.pill.eq(pill))
                .fetch();
    }

    // 영양제에 포함된 생리활성기능 반환
    public List<String> findFunctionalityByPill(Pill pill) {
        return queryFactory
                .select(functionality.functionalityContent)
                .from(functionality)
                .join(pillFunctionality)
                .on(functionality.eq(pillFunctionality.functionality))
                .where(pillFunctionality.pill.eq(pill))
                .fetch();
    }

    public List<Warning> findWarningByPill(Pill pill) {
        return queryFactory
                .selectFrom(warning)
                .join(pillWarning)
                .on(warning.eq(pillWarning.warning))
                .where(pillWarning.pill.eq(pill))
                .fetch();
    }

    public Page<PillReview> findReviewByPillId(int pillId, Pageable pageable) {
        return new PageImpl<>(
                queryFactory
                        .selectFrom(pillReview)
                        .where(pillReview.pill.pillId.eq(pillId))
                        .orderBy(pillReview.createdDate.desc())
                        .limit(pageable.getPageSize())
                        .fetch()
        );
    }

    public List<List<PillCalendarResponse>> findPillByUserPill(User user, String search) {
        List<Pill> taking = queryFactory
                .selectFrom(pill)
                .join(userPill)
                .on(pill.eq(userPill.pill))
                .where(userPill.userPillTaking.eq(YN.Y)
                        .and(pill.pillName.contains(search))
                        .and(userPill.users.eq(user)))
                .limit(5)
                .fetch();

        List<Pill> notTaking = queryFactory
                .selectFrom(pill)
                .where(pill.pillName.contains(search)
                        .and(pill.notIn(taking)))
                .limit(5)
                .fetch();

        List<List<PillCalendarResponse>> result = new ArrayList<>();
        result.add(taking.stream().map(PillCalendarResponse::from).collect(Collectors.toList()));
        result.add(notTaking.stream().map(PillCalendarResponse::from).collect(Collectors.toList()));

        return result;
    }
}


