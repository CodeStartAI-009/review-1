import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import HourlyForecast from "./components/HourlyForecast";
import WeatherMap from "./components/WeatherMap";
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [mapCoords, setMapCoords] = useState([16.5062, 80.6480]);
  const [history, setHistory] = useState([]);
  const [currentLocationName, setCurrentLocationName] = useState("Vijayawada");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null); // ✅ userId only

  useEffect(() => {
    if (!isLoggedIn) return;

    const loadDefaultWeather = async () => {
      try {
        setIsLoading(true);

        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=16.5062&lon=80.6480&units=metric&appid=c7e2aa9c576616f325ae9cbf52c1fcc4`
        );
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=16.5062&lon=80.6480&units=metric&appid=c7e2aa9c576616f325ae9cbf52c1fcc4`
        );
        const forecastData = await forecastResponse.json();

        setWeatherData(weatherData);
        setForecastData(forecastData);
        setCurrentLocationName("Vijayawada");

        const daily = {};
        forecastData.list.forEach(item => {
          const date = item.dt_txt.split(" ")[0];
          if (!daily[date]) daily[date] = [];
          daily[date].push(item);
        });
        setSelectedDay(Object.values(daily)[0]);

        if (currentUserId) {
          const historyResponse = await fetch(
            `http://localhost:8081/api/history?userId=${currentUserId}`
          );
          const historyData = await historyResponse.json();
          setHistory(historyData);
        }
      } catch (err) {
        console.error("Error loading default weather:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDefaultWeather();
  }, [isLoggedIn, currentUserId]);

  const handleNewSearch = async (coords, weather, forecast, locationName) => {
    setWeatherData(weather);
    setForecastData(forecast);
    setMapCoords([coords.lat, coords.lon]);
    setCurrentLocationName(locationName);

    const daily = {};
    forecast.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      if (!daily[date]) daily[date] = [];
      daily[date].push(item);
    });
    setSelectedDay(Object.values(daily)[0]);

    if (currentUserId) {
      try {
        await fetch(`http://localhost:8081/api/history?userId=${currentUserId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city: locationName, lat: coords.lat, lon: coords.lon })
        });

        const historyResponse = await fetch(
          `http://localhost:8081/api/history?userId=${currentUserId}`
        );
        const historyData = await historyResponse.json();
        setHistory(historyData);
      } catch (err) {
        console.error("Error saving search history:", err);
      }
    }
  };

  const handleHistoryClick = (item) => {
    setMapCoords([item.lat, item.lon]);
    setCurrentLocationName(item.city);

    if (item.forecast && item.forecast.list) {
      const daily = {};
      item.forecast.list.forEach(i => {
        const date = i.dt_txt.split(" ")[0];
        if (!daily[date]) daily[date] = [];
        daily[date].push(i);
      });
      setSelectedDay(Object.values(daily)[0]);
    }
  };

  // ✅ Fix: store only the ID
  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setCurrentUserId(user.id);
  };

  if (!isLoggedIn) return <LandingPage onLoginSuccess={handleLoginSuccess} />;

  if (isLoading) return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p className="loading-text">Loading Vijayawada weather data...</p>
    </div>
  );

  return (
    <div className="app-container">
      <div className="search-history-row">
        <div className="search-bar-wrapper">
          <SearchBar onSearch={handleNewSearch} />
        </div>

        <div className="history-chips">
          {history.length === 0 ? <p className="no-history">No searches yet</p> :
            history.map((item, i) => (
              <div key={i} className="history-chip" onClick={() => handleHistoryClick(item)}>
                <span>{item.city}</span>
              </div>
            ))
          }
        </div>
      </div>

      <div className="main-grid">
        <div className="lg-col-span-2">
          <CurrentWeather data={weatherData} locationName={currentLocationName} />
        </div>
        <div className="lg-col-span-1">
          <WeatherMap coords={mapCoords} weather={weatherData} locationName={currentLocationName} />
        </div>
      </div>

      <div className="forecast-hourly-row">
        <div className="forecast-card">
          <Forecast data={forecastData} setSelectedDay={setSelectedDay} />
        </div>
        <div className="hourly-card">
          {selectedDay ? <HourlyForecast entries={selectedDay} /> :
            <div className="hourly-placeholder"><p>Select a day to view hourly forecast</p></div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
