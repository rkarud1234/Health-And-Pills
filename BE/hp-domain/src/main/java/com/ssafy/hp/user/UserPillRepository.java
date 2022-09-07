package com.ssafy.hp.user;

import com.ssafy.hp.user.domain.UserPill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPillRepository extends JpaRepository<UserPill, Long> {
}
