import React from "react";
import "../style/CurrentWeather.css";

function CurrentWeather({ data, locationName }) {
  if (!data) return null;

  return (
    <div className="current-weather">
      <h2>{locationName}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
      />
      <p className="description">{data.weather[0].description}</p>
      <p className="temperature">{Math.round(data.main.temp)}°C</p>
      <div className="details">
        <div>💧 Humidity: {data.main.humidity}%</div>
        <div>🌬 Wind: {data.wind.speed} m/s</div>
        <div>🌡 Feels like: {Math.round(data.main.feels_like)}°C</div>
      </div>
    </div>
  );
}

export default CurrentWeather;
