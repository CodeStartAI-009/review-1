import React from "react";
import "../style/Forecast.css";

function Forecast({ data, setSelectedDay }) {
  if (!data || !data.list) return null;

  // Group forecast by day
  const dailyForecast = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!dailyForecast[date]) dailyForecast[date] = [];
    dailyForecast[date].push(item);
  });

  const days = Object.keys(dailyForecast);

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      {days.map((day, index) => {
        const dayData = dailyForecast[day];
        const tempMin = Math.min(...dayData.map((d) => d.main.temp_min));
        const tempMax = Math.max(...dayData.map((d) => d.main.temp_max));
        const icon = dayData[0].weather[0].icon;
        const description = dayData[0].weather[0].description;

        return (
          <div
            key={index}
            onClick={() => setSelectedDay(dayData)}
            className="forecast-day"
          >
            <div>
              {new Date(day).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </div>
            <div className="description">
              <img
                src={`https://openweathermap.org/img/wn/${icon}.png`}
                alt={description}
              />
              <span>{description}</span>
            </div>
            <div>
              {Math.round(tempMin)}°C / {Math.round(tempMax)}°C
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Forecast;
