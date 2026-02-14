package com.ecommerce.equipo_26.service;

import com.ecommerce.equipo_26.dtos.AuthenticationRequest;
import com.ecommerce.equipo_26.dtos.AuthenticationToken;

public interface AuthenticationService {

    AuthenticationToken authentication(AuthenticationRequest authenticationRequest);

}
