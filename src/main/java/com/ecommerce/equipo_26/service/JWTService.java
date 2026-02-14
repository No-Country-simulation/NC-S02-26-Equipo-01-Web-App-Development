package com.ecommerce.equipo_26.service;

import com.ecommerce.equipo_26.dtos.AuthenticationRequest;
import jakarta.servlet.http.HttpServletRequest;

public interface JWTService {

    String extractJwtTokenFromRequest(HttpServletRequest request);

    boolean validateJwtToken(String jwt);

    String extractUsernameFromJwt(String jwt);

    String generateTokenJwt(AuthenticationRequest authenticationRequest);
}
