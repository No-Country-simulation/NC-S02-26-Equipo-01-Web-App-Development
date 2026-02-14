package com.ecommerce.equipo_26.service.implementation;

import com.ecommerce.equipo_26.dtos.AuthenticationRequest;
import com.ecommerce.equipo_26.exception.SecurityInvalidJwtException;
import com.ecommerce.equipo_26.models.Usuario;
import com.ecommerce.equipo_26.service.JWTService;
import com.ecommerce.equipo_26.service.UsuarioService;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;


@Service
@Slf4j
public class JWTServiceImplementation implements JWTService {


    @Value("${spring.application.name}")
    private String jwtIssuer;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration-in-minutes}")
    private Long expirationInMinutes;

    private final UsuarioService usuarioService;

    public JWTServiceImplementation(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
    @Override
    public String extractJwtTokenFromRequest(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }

    @Override
    public boolean validateJwtToken(String jwt) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(jwt);

            boolean validSignature = signedJWT.verify(new MACVerifier(secret.getBytes()));
            if (!validSignature) return false;

            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();

            return claims.getExpirationTime().after(new Date()) &&
                    jwtIssuer.equals(claims.getIssuer());


        } catch (Exception e) {
            log.warn("JWT validation failed: {}", e.getMessage());
            return false;
        }
    }

    @Override
    public String extractUsernameFromJwt(String jwt) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(jwt);
            return signedJWT.getJWTClaimsSet().getSubject();
        } catch (Exception e) {
            throw new SecurityInvalidJwtException("Invalid JWT");
        }
    }

    @Override
    public String generateTokenJwt(AuthenticationRequest authenticationRequest) {
        try {
            Usuario usuario = usuarioService.findUserByUsername(authenticationRequest.username());

            LocalDateTime issuedAt = LocalDateTime.now();
            LocalDateTime expiresAt = issuedAt.plusMinutes(expirationInMinutes);

            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(usuario.getUsername())
                    .issuer(jwtIssuer)
                    .issueTime(toDate(issuedAt))
                    .expirationTime(toDate(expiresAt))
                    .build();

            SignedJWT signedJWT = new SignedJWT(
                    new JWSHeader(JWSAlgorithm.HS256),
                    claimsSet
            );

            signedJWT.sign(new MACSigner(secret.getBytes()));

            return signedJWT.serialize();

        } catch (Exception e) {
            throw new SecurityInvalidJwtException("Error generating JWT");
        }
    }

    private Date toDate(LocalDateTime time) {
        return Date.from(time.atZone(ZoneId.systemDefault()).toInstant());
    }

}

