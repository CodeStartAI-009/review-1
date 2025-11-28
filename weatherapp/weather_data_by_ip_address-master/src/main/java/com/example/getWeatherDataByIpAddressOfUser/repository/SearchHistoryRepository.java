 package com.example.getWeatherDataByIpAddressOfUser.repository;

import com.example.getWeatherDataByIpAddressOfUser.model.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
    List<SearchHistory> findByUserIdOrderByIdDesc(Long userId);
}
