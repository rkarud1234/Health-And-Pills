package com.ssafy.hp.exercise.service;

import com.ssafy.hp.common.type.*;
import com.ssafy.hp.exercise.response.*;
import org.springframework.data.domain.*;

public interface ExerciseService {

    // 운동 종류별 조회
    Page<ExerciseListResponse> findByExerciseCategory(Integer category, Pageable pageable);

    // 운동 부위별 조회
    Page<ExerciseListResponse> findByExercisePart(Integer part, Pageable pageable);

    // 베스트 10 운동 추천

    // 000님을 위한 맞춤 추천

    // 00대 여성이 많이 하는 운동 추천

    // {스쿼트}와 유사한 운동 추천

    // 운동 상세정보 조회
    ExerciseDetailResponse findByExerciseId(Integer exerciseId);

    // 운동중 상태 변경
    void updateUserExerciseDoingByExerciseId(Long ExerciseId, YN check);

    // 좋아요 상태 변경
    void updateUserExerciseLikeByExerciseId(Long ExerciseId, YN check);

    // 북마크 상태 변경
    void updateUserExerciseBookmarkByExerciseId(Long ExerciseId, YN check);

}
