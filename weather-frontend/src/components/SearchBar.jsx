import React, { useState } from "react";
import '../style/SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const API_KEY = "c7e2aa9c576616f325ae9cbf52c1fcc4"; // Replace with your API key

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      // Get coordinates for the searched location
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();

      if (!geoData || geoData.length === 0) {
        alert("Location not found");
        return;
      }

      const { lat, lon } = geoData[0];
      const searchedLocationName = query; // Keep original input name

      // Get current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();

      // Get forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();

      onSearch({ lat, lon }, weatherData, forecastData, searchedLocationName);
      setQuery("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data");
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search location..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
