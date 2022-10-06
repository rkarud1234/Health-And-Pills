package com.ssafy.hp.user;

import com.ssafy.hp.user.domain.UserEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEventRepository extends JpaRepository<UserEvent, Integer> {
}
