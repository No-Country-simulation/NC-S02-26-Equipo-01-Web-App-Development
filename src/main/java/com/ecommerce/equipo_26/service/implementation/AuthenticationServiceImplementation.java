package com.ecommerce.equipo_26.service.implementation;

import com.ecommerce.equipo_26.dtos.AuthenticationRequest;
import com.ecommerce.equipo_26.dtos.AuthenticationToken;
import com.ecommerce.equipo_26.service.AuthenticationService;
import com.ecommerce.equipo_26.service.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImplementation implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;


    @Override
    public AuthenticationToken authentication(AuthenticationRequest authenticationRequest) {
        authenticationUsuario(authenticationRequest);
        String token= jwtService.generateTokenJwt(authenticationRequest);
        return new AuthenticationToken(token);
    }

    private void authenticationUsuario(AuthenticationRequest authenticationRequest){
        Authentication authentication= new UsernamePasswordAuthenticationToken(authenticationRequest.username(),authenticationRequest.password());
        authenticationManager.authenticate(authentication);
    }
}
