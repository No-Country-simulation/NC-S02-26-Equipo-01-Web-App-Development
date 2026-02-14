package com.ecommerce.equipo_26.service;

import com.ecommerce.equipo_26.dtos.DefaultResponse;
import com.ecommerce.equipo_26.dtos.UsuarioDTO;
import com.ecommerce.equipo_26.models.Usuario;
import org.apache.catalina.User;

public interface UsuarioService {

    DefaultResponse createUser(UsuarioDTO usuarioDTO);


    Usuario findUserByUsername(String subject);
}
