package com.example.getWeatherDataByIpAddressOfUser.service;

import com.example.getWeatherDataByIpAddressOfUser.model.User;
import com.example.getWeatherDataByIpAddressOfUser.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User signup(User user) {
        // Here you can hash password before saving
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password) {
        Optional<User> existing = userRepository.findByEmail(email);
        if (existing.isPresent() && existing.get().getPassword().equals(password)) {
            return existing;
        }
        return Optional.empty();
    }
}
