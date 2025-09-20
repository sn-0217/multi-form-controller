package com.multiform.app.service;

import com.multiform.app.entity.Role;
import com.multiform.app.entity.Users;
import com.multiform.app.repository.UserDetailsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AdminUserAddService {

    @Bean
    public CommandLineRunner createAdminUser(UserDetailsRepository userDetailsRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            List<Users> myUsers = List.of(
                    new Users("admin", passwordEncoder.encode("admin"), Role.ADMIN),
                    new Users("sn", passwordEncoder.encode("sn"), Role.USER),
                    new Users("santhu", passwordEncoder.encode("santhu"), Role.USER)
            );

            myUsers.forEach(user -> {
                if (userDetailsRepository.findByUsername(user.getUsername()).isEmpty()) {
                    userDetailsRepository.save(user);
                    System.out.println("Created user: " + user.getUsername());
                }
            });
        };
    }
}
