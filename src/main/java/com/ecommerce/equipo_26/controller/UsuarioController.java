package com.ecommerce.equipo_26.controller;

import com.ecommerce.equipo_26.dtos.DefaultResponse;
import com.ecommerce.equipo_26.dtos.UsuarioDTO;
import com.ecommerce.equipo_26.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping("/create-user")
    public ResponseEntity<DefaultResponse> createUser(@RequestBody UsuarioDTO usuarioDTO){

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.createUser(usuarioDTO));

    }

    @GetMapping("/prueba")
    public ResponseEntity<String> prueba(){
        return ResponseEntity.ok("alessandra");
    }




}
