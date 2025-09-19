package com.multiform.app.repository;

import com.multiform.app.entity.App;
import com.multiform.app.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    // One submission per app
    Optional<Submission> findByApp(App app);

    // Optional: get submissions by appName (via app entity)
    default Optional<Submission> findByAppName(String appName) {
        return findAll().stream()
                .filter(s -> s.getApp() != null && s.getApp().getAppName().equals(appName))
                .findFirst();
    }

    // Get all submissions linked to a specific app
    List<Submission> findAllByApp(App app);
}
