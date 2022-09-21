package com.ssafy.hp.pill.query;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hp.common.type.YN;
import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.pill.domain.QPill;
import com.ssafy.hp.pill.domain.Warning;
import com.ssafy.hp.pill.request.SearchRequest;
import com.ssafy.hp.pill.response.PillListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static com.ssafy.hp.pill.domain.QNutrient.nutrient;
import static com.ssafy.hp.pill.domain.QPill.pill;
import static com.ssafy.hp.pill.domain.QPillNutrient.pillNutrient;
import static com.ssafy.hp.pill.domain.QPillWarning.pillWarning;
import static com.ssafy.hp.pill.domain.QPillFunctionality.pillFunctionality;
import static com.ssafy.hp.pill.domain.QWarning.warning;

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
         Integer[] materials = Stream.of(request.getMaterials().split(",")).mapToInt(Integer::parseInt).boxed().toArray(Integer[]::new);
         Integer[] functionalities = Stream.of(request.getMaterials().split(",")).mapToInt(Integer::parseInt).boxed().toArray(Integer[]::new);

         List<Pill> results = queryFactory
                 .selectFrom(pill)
                 .distinct()
                 .rightJoin(pillNutrient)
                 .on(pill.pillId.eq(pillNutrient.pill.pillId)
                         .and(pillNutrient.nutrient.nutrientId.in(materials)))
                 .rightJoin(pillFunctionality)
                 .on(pill.pillId.eq(pillFunctionality.pill.pillId)
                         .and(pillFunctionality.functionality.functionality_id.in(functionalities)))
                 .where(pill.pillName.isNotNull())
                 .orderBy(pill.pillId.asc())
                 .limit(pageable.getPageSize())
                 .fetch();

        System.out.println(results.toString());
        System.out.println(results.get(0));

//        List<Pill> pillResult = new ArrayList<>();
//
//        for (Tuple tuple : results) {
//            int pillId = tuple.get(pill.pillId);
//            String pillName = tuple.get(pill.pillName);
//            String pillCompanyName = tuple.get(pill.pillCompanyName);
//            String pillThumbnail = tuple.get(pill.pillThumbnail);
//            int pillReviewCount = tuple.get(pill.reviewCount);
//            double pillReviewAverage = tuple.get(pill.reviewAverage);
//            pillResult.add(new Pill(pillId, pillName, pillCompanyName, pillThumbnail, pillReviewCount, pillReviewAverage));
//        }

        return new PageImpl<>(results);
    }

//    List<Pill> results = queryFactory
//            .selectFrom(pill)
//            .distinct()
//            .join(pillNutrient)
//            .on(pillNutrient.nutrient.nutrientId.in(test2))
//            .where(
//                    pill.pillName.contains(request.getSearch())
//                            .and(pill.pillDomestic.eq(request.getDomestic()))
//            )
//            .offset(pageable.getOffset())
//            .limit(pageable.getPageSize())
//            .fetch();

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

}
