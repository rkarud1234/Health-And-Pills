package com.ssafy.hp.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEventRepository extends JpaRepository<UserEvent, Integer> {
}
