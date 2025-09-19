package com.multiform.app.controller;

import com.multiform.app.entity.App;
import com.multiform.app.service.AppService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/apps")
public class AppController {

    private final AppService appService;

    public AppController(AppService appService) {
        this.appService = appService;
    }

    // Create or Update
    @PostMapping
    public ResponseEntity<App> createOrUpdateApp(@RequestBody App app) {
        return ResponseEntity.ok(appService.saveApp(app));
    }

    // Get all apps
    @GetMapping
    public ResponseEntity<List<App>> getAllApps() {
        return ResponseEntity.ok(appService.getAllApps());
    }

    // Get by appName
    @GetMapping("/{appName}")
    public ResponseEntity<App> getAppByName(@PathVariable String appName) {
        return appService.getAppByName(appName)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete by appName
    @DeleteMapping("/{appName}")
    public ResponseEntity<Void> deleteAppByName(@PathVariable String appName) {
        if (appService.existsByAppName(appName)) {
            appService.deleteAppByName(appName);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{appName}")
    public ResponseEntity<App> updateAppWindow(
            @PathVariable String appName,
            @RequestBody Map<String, Object> updates) {

        String changeNo = (String) updates.get("changeNo");

        LocalDateTime startWindow = updates.get("startWindow") != null
                ? LocalDateTime.parse((String) updates.get("startWindow"))
                : null;

        LocalDateTime endWindow = updates.get("endWindow") != null
                ? LocalDateTime.parse((String) updates.get("endWindow"))
                : null;

        return appService.updateAppWindow(appName, changeNo, startWindow, endWindow)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
