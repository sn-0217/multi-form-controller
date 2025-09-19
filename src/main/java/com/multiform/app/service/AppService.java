package com.multiform.app.service;

import com.multiform.app.entity.App;
import com.multiform.app.exception.DuplicateResourceException;
import com.multiform.app.repository.AppRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppService {

    private final AppRepository appRepository;

    public AppService(AppRepository appRepository) {
        this.appRepository = appRepository;
    }

    // Create or Update
    public App saveApp(App app) {
        // Check if an app with the same name already exists
        boolean exists = appRepository.findByAppName(app.getAppName()).isPresent();
        if (exists) {
            throw new DuplicateResourceException("App already exists with name: " + app.getAppName());
        }

        // Save new app
        return appRepository.save(app);
    }

    // Get all apps
    public List<App> getAllApps() {
        return appRepository.findAll();
    }

    // Get by AppName
    public Optional<App> getAppByName(String appName) {
        return appRepository.findByAppName(appName);
    }

    // Delete by AppName
    public void deleteAppByName(String appName) {
        appRepository.deleteByAppName(appName);
    }

    // Check existence
    public boolean existsByAppName(String appName) {
        return appRepository.existsByAppName(appName);
    }

    public Optional<App> updateAppWindow(String appName, String changeNo,
                                         LocalDateTime startWindow, LocalDateTime endWindow) {
        return appRepository.findByAppName(appName).map(existingApp -> {
            if (changeNo != null) existingApp.setChangeNo(changeNo);
            if (startWindow != null) existingApp.setStartWindow(startWindow);
            if (endWindow != null) existingApp.setEndWindow(endWindow);
            return appRepository.save(existingApp);
        });
    }
}
