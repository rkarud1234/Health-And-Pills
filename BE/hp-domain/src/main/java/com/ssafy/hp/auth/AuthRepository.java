package com.ssafy.hp.auth;

import com.ssafy.hp.auth.domain.Auth;
import org.springframework.data.repository.CrudRepository;

public interface AuthRepository extends CrudRepository<Auth, Long> {
}