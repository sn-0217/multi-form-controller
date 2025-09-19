package com.multiform.app.repository;

import com.multiform.app.entity.App;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppRepository extends JpaRepository<App, Long> {
    Optional<App> findByAppName(String appName);
    void deleteByAppName(String appName);
    boolean existsByAppName(String appName);
}
