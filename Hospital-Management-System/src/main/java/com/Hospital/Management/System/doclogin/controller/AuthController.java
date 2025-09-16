package com.Hospital.Management.System.doclogin.controller;

import com.Hospital.Management.System.doclogin.entity.User;
import com.Hospital.Management.System.doclogin.repository.UserRepository;
import com.Hospital.Management.System.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public String login(@RequestBody User loginRequest) throws AuthenticationException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(), loginRequest.getPassword()
                )
        );
        if (authentication.isAuthenticated()) {
            String token = jwtUtil.generateToken(loginRequest.getUsername());
            System.out.println("Generated JWT: " + token);
            return token;
        } else {
            throw new RuntimeException("Invalid login");
        }
    }
}
