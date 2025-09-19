package com.multiform.app.repository;

import com.multiform.app.entity.Users;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDetailsRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);
}
