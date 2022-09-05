package com.ssafy.hp.security.service;

import com.ssafy.hp.NotFoundException;
import com.ssafy.hp.user.UserRepository;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.hp.NotFoundException.USER_NOT_FOUND;


@Service
@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User findUser = userRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(String.valueOf(findUser.getRole())));

        return new org.springframework.security.core.userdetails.User(String.valueOf(findUser.getUserId()), "", authorities);
    }
}