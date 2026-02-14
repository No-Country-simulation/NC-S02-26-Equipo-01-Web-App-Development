package com.ecommerce.equipo_26.service.implementation;

import com.ecommerce.equipo_26.dtos.DefaultResponse;
import com.ecommerce.equipo_26.dtos.UsuarioDTO;
import com.ecommerce.equipo_26.exception.UserNotFoundException;
import com.ecommerce.equipo_26.models.Usuario;
import com.ecommerce.equipo_26.repository.UsuarioRepository;
import com.ecommerce.equipo_26.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioServicesImplementation implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public DefaultResponse createUser(UsuarioDTO usuarioDTO) {

        Usuario usuario = new Usuario();
        usuario.setEmail(usuarioDTO.email());
        usuario.setUsername(usuarioDTO.username());
        usuario.setTelefono(usuarioDTO.telefono());
        usuario.setPassword(passwordEncoder.encode(usuarioDTO.password()));

        usuarioRepository.save(usuario);

        return new DefaultResponse(true);
    }

    @Override
    public Usuario findUserByUsername(String subject) {
        return usuarioRepository.findByUsername(subject).orElseThrow(
                ()->new UserNotFoundException("Usuario no Encontrado")
        );
    }

}
