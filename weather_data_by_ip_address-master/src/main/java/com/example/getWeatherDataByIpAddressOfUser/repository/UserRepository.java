package com.example.getWeatherDataByIpAddressOfUser.repository;

import com.example.getWeatherDataByIpAddressOfUser.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
