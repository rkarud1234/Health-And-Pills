package com.ssafy.hp.pill.query;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.exercise.domain.Exercise;
import com.ssafy.hp.exercise.response.ExerciseCalendarResponse;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.pill.domain.PillReview;
import com.ssafy.hp.pill.domain.QPill;
import com.ssafy.hp.pill.domain.Warning;
import com.ssafy.hp.pill.request.SearchRequest;
import com.ssafy.hp.pill.response.PillCalendarResponse;
import com.ssafy.hp.pill.response.PillListResponse;
import com.ssafy.hp.pill.response.PillReviewListResponse;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.ssafy.hp.exercise.domain.QExercise.exercise;
import static com.ssafy.hp.pill.domain.QNutrient.nutrient;
import static com.ssafy.hp.pill.domain.QPill.pill;
import static com.ssafy.hp.pill.domain.QPillNutrient.pillNutrient;
import static com.ssafy.hp.pill.domain.QPillWarning.pillWarning;
import static com.ssafy.hp.pill.domain.QPillFunctionality.pillFunctionality;
import static com.ssafy.hp.pill.domain.QWarning.warning;
import static com.ssafy.hp.pill.domain.QPillReview.pillReview;
import static com.ssafy.hp.user.domain.QUserExercise.userExercise;
import static com.ssafy.hp.user.domain.QUserPill.userPill;

@Repository
@RequiredArgsConstructor
public class PillQueryRepository {

    private final JPAQueryFactory queryFactory;

//    SELECT DISTINCT p.* FROM pill as p
//    right outer join pill_nutrient as pn
//    ON p.pill_id = pn.pill_id AND pn.nutrient_id in (1,2,3)
//    right outer join pill_functionality as pf
//    ON p.pill_id = pf.pill_id AND pf.functionality_id in (1,2,3)
//    WHERE NOT p.pill_name is null
//    order by p.pill_id;

    public Page<Pill> findBySearchFilter(SearchRequest request, Pageable pageable) {
        //////////////////////////////////////////
        // 추천알고리즘이 급해서 일단 올립니다.
        // 테스트코드 작성하면서 리팩토링 하겠습니다 ㅠ
        //////////////////////////////////////////
        Integer[] materials = new Integer[0];
        Integer[] functionalities = new Integer[0];

        if (!request.getMaterials().equals(""))
            materials = Stream.of(request.getMaterials().split(",")).mapToInt(Integer::parseInt).boxed().toArray(Integer[]::new);

        if (!request.getFunctionalities().equals(""))
            functionalities = Stream.of(request.getMaterials().split(",")).mapToInt(Integer::parseInt).boxed().toArray(Integer[]::new);

        List<Pill> results = queryFactory
                .selectFrom(pill)
                .distinct()
                .rightJoin(pillNutrient)
                .on(pill.pillId.eq(pillNutrient.pill.pillId)
                        .and(materials.length != 0 ? pillNutrient.nutrient.nutrientId.in(materials) : pill.isNotNull())
                )
                .rightJoin(pillFunctionality)
                .on(pill.pillId.eq(pillFunctionality.pill.pillId)
                        .and(functionalities.length != 0 ? pillFunctionality.functionality.functionalityId.in(functionalities) : pill.isNotNull())
                )
                .where((request.getSearch().equals("") && request.getDomestic() == null) // 국내여부, 키워드 모두 비어있으면
                        ? pill.isNotNull() // 모든 영양제
                        : (request.getSearch().equals("") && request.getDomestic() != null)  // 키워드는 없는데 국내여부가 있으면
                        ? pill.pillDomestic.eq(request.getDomestic()) // 국내여부에 따라 결과 도출
                        : (!request.getSearch().equals("") && request.getDomestic() == null) // 키워드는 있는데 국내여부가 없으면
                        ? pill.pillName.contains(request.getSearch()) // 키워드에 맞는 국내외 상관없이 모두 도출
                        : (!request.getSearch().equals("") && request.getDomestic() != null) // 키워드, 국내여부 모두 값이 있으면
                        ? pill.pillName.contains(request.getSearch()).and(pill.pillDomestic.eq(request.getDomestic()))
                        : pill.isNotNull()
                )
                .orderBy(pill.pillId.asc())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(results);
    }

    private BooleanExpression searchKeywordEq(String search) {
        return search != null ? pill.pillName.contains(search) : null;
    }

    private BooleanExpression domesticEq(YN domestic) {
        return domestic != null ? pill.pillDomestic.eq(domestic) : null;
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
