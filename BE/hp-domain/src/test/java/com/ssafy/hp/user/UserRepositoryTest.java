package com.ssafy.hp.user;

import com.ssafy.hp.user.domain.User;
import com.ssafy.hp.user.domain.type.Provider;
import com.ssafy.hp.user.domain.type.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("이름으로 회원을 조회한다.")
    void findByUserName() {
        // given
        User user = User.createUser(Provider.google, "109764055816357512970", "google_109764055816357512970", Role.ROLE_USER, "한싸피");
        userRepository.save(user);

        // when
        User result = userRepository.findByUserName("google_109764055816357512970").get();

        // then
        assertThat(result).isEqualTo(user);
    }
}