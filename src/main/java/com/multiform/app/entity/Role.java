package com.multiform.app.entity;

import lombok.Getter;

import java.util.Set;

@Getter
public enum Role {
    ADMIN(Set.of(Permissions.WEATHER_READ, Permissions.WEATHER_WRITE, Permissions.WEATHER_DELETE)),
    USER(Set.of(Permissions.WEATHER_READ));

    private final Set<Permissions> permissions;

    Role(Set<Permissions> permissions) {
        this.permissions = permissions;
    }
}
