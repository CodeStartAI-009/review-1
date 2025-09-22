package com.example.getWeatherDataByIpAddressOfUser.controller;

import com.example.getWeatherDataByIpAddressOfUser.model.SearchHistory;
import com.example.getWeatherDataByIpAddressOfUser.repository.SearchHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "*")
public class SearchHistoryController {

    @Autowired
    private SearchHistoryRepository repository;

    @GetMapping
    public List<SearchHistory> getHistory(@RequestParam Long userId) {
        return repository.findByUserIdOrderByIdDesc(userId);
    }

    @PostMapping
    public SearchHistory addHistory(@RequestBody SearchHistory entry) {
        return repository.save(entry);
    }
}
