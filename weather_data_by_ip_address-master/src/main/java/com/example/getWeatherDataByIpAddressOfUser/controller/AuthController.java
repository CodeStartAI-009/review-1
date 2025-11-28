package com.example.getWeatherDataByIpAddressOfUser.controller;

import com.example.getWeatherDataByIpAddressOfUser.model.User;
import com.example.getWeatherDataByIpAddressOfUser.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        // In production, hash the password!
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        Optional<User> existing = userRepository.findByEmail(user.getEmail());
        if (existing.isPresent() && existing.get().getPassword().equals(user.getPassword())) {
            return existing.get();
        }
        throw new RuntimeException("Invalid email or password");
    }
}
