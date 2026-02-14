package com.ecommerce.equipo_26.controller;


import com.ecommerce.equipo_26.dtos.AuthenticationRequest;
import com.ecommerce.equipo_26.dtos.AuthenticationToken;
import com.ecommerce.equipo_26.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authentication")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<AuthenticationToken> login(@RequestBody AuthenticationRequest authenticationRequest){

        return ResponseEntity.ok(authenticationService.authentication(authenticationRequest));

    }
}
