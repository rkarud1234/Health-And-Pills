package com.ssafy.hp.user.service;

import com.ssafy.hp.user.UserRepository;
import com.ssafy.hp.user.request.UpdateUserExerciseRequest;
import com.ssafy.hp.user.request.UpdateUserInbodyRequest;
import com.ssafy.hp.user.response.UserExerciseResponse;
import com.ssafy.hp.user.response.UserInfoResponse;
import com.ssafy.hp.user.response.UserPillResponse;
import com.ssafy.hp.user.response.UserReviewResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    @Override
    public UserInfoResponse findUser(int userId) {
        return null;
    }

    @Override
    public List<UserExerciseResponse> findExerciseByUserId(int userId) {
        return null;
    }

    @Override
    public List<UserPillResponse> findPillByUserId(int userId) {
        return null;
    }

    @Override
    public List<UserReviewResponse> findReviewByUserId(int userId) {
        return null;
    }

    @Override
    public void updateUserExercise(int userId, UpdateUserExerciseRequest request) {

    }

    @Override
    public void updateUserInbody(int userId, UpdateUserInbodyRequest request) {

    }

    @Override
    public void logout(int userId) {

    }

    @Override
    public void deleteUser(int userId) {

    }
}
