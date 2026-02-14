package com.ecommerce.equipo_26.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AuthenticationRequest(String username, String password) {


}
