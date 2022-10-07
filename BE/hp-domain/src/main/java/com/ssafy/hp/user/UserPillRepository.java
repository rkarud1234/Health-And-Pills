package com.ssafy.hp.user;

import com.ssafy.hp.pill.domain.Pill;
import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.domain.UserPill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserPillRepository extends JpaRepository<UserPill, Integer> {
    Optional<UserPill> findUserPillByUsersAndPill(User user, Pill pill);
}
