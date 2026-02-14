package com.ecommerce.equipo_26.configuration.filters;

import com.ecommerce.equipo_26.models.Usuario;
import com.ecommerce.equipo_26.service.JWTService;
import com.ecommerce.equipo_26.service.UsuarioService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final UsuarioService usuarioService;
    private final JWTService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String JWTToken = jwtService.extractJwtTokenFromRequest(request);
        if (JWTToken==null || JWTToken.isEmpty()){
            filterChain.doFilter(request,response);
            return;
        }
        if (!jwtService.validateJwtToken(JWTToken)){
            filterChain.doFilter(request,response);
            return;
        }
        String username=jwtService.extractUsernameFromJwt(JWTToken);
        Usuario usuario = usuarioService.findUserByUsername(username);
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
        new UsernamePasswordAuthenticationToken(usuario,null,usuario.getAuthorities());
        usernamePasswordAuthenticationToken.setDetails(request);
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        filterChain.doFilter(request, response);
    }
}
