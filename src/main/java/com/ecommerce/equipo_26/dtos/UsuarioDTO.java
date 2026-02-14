package com.ecommerce.equipo_26.dtos;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UsuarioDTO(
        String username,
        String password,
        String email,
        String telefono
) {


}
