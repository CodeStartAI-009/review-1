import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceArea,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import "../style/HourlyForecast.css";

const HourlyForecast = ({ entries }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!entries || entries.length === 0) return null;

  // Convert 3-hour intervals into hourly by interpolation
  const hourlyData = [];
  for (let i = 0; i < entries.length - 1; i++) {
    const curr = entries[i];
    const next = entries[i + 1];

    for (let h = 0; h < 3; h++) {
      const dt = new Date(curr.dt * 1000);
      dt.setHours(dt.getHours() + h);

      const factor = h / 3;
      const interp = (a, b) => a + (b - a) * factor;

      hourlyData.push({
        time: dt.toLocaleTimeString("en-IN", { hour: "numeric", hour12: true }),
        timeFull: dt,
        temp: Math.round(interp(curr.main.temp, next.main.temp)),
        humidity: Math.round(interp(curr.main.humidity, next.main.humidity)),
        wind: parseFloat(interp(curr.wind.speed, next.wind.speed).toFixed(1)),
        precipitation: Math.round(interp(curr.pop * 100, next.pop * 100)),
        rainAmount: interp(curr.rain?.["3h"] || 0, next.rain?.["3h"] || 0),
        icon: curr.weather[0].icon,
        desc: curr.weather[0].description,
      });
    }
  }

  // Find rain periods
  const rainPeriods = [];
  let rainStart = null;

  hourlyData.forEach((data, i) => {
    const isRaining = data.rainAmount > 0;
    if (isRaining && rainStart === null) rainStart = i;
    else if (!isRaining && rainStart !== null) {
      rainPeriods.push({ start: rainStart, end: i - 1 });
      rainStart = null;
    }
  });
  if (rainStart !== null) rainPeriods.push({ start: rainStart, end: hourlyData.length - 1 });

  // Tabs
  const tabOptions = [
    { key: "overview", label: "Temperature", color: "#38bdf8", dataKey: "temp", unit: "°C" },
    { key: "precipitation", label: "Rain", color: "#60a5fa", dataKey: "precipitation", unit: "%" },
    { key: "wind", label: "Wind", color: "#a78bfa", dataKey: "wind", unit: " m/s" },
    { key: "humidity", label: "Humidity", color: "#2dd4bf", dataKey: "humidity", unit: "%" },
  ];
  const activeConfig = tabOptions.find((t) => t.key === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="hourly-forecast-container"
    >
      <h2>24-Hour Forecast</h2>

      {/* Hourly forecast list */}
      <div className="hourly-forecast-list">
        {hourlyData.map((item, i) => (
          <div key={i} className="hourly-item">
            <div className="time">{item.time}</div>
            <img src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} alt={item.desc} />
            <div className="temp">{item.temp}°C</div>
            {item.rainAmount > 0 && <div className="rain">💧 {item.rainAmount.toFixed(1)}mm</div>}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        {tabOptions.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={activeTab === tab.key ? "tab-button tab-active" : "tab-button tab-inactive"}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Graph */}
      <div style={{ height: 192 /* 48 * 4 px */ }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#93c5fd" interval={3} tick={{ fill: "#93c5fd", fontSize: 10 }} />
            <YAxis stroke="#93c5fd" tick={{ fill: "#93c5fd", fontSize: 10 }} width={30} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
                border: "1px solid #333",
                borderRadius: 8,
                color: "#fff",
              }}
              formatter={(value) => [`${value}${activeConfig.unit}`, activeConfig.label]}
            />
            {rainPeriods.map((period, i) => (
              <ReferenceArea
                key={i}
                x1={hourlyData[period.start].time}
                x2={hourlyData[period.end].time}
                strokeOpacity={0.3}
                fill="#3b82f6"
                fillOpacity={0.1}
              />
            ))}
            <Line type="monotone" dataKey={activeConfig.dataKey} stroke={activeConfig.color} strokeWidth={2} dot={{ r: 2, fill: activeConfig.color }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Rain alerts */}
      <AnimatePresence>
        {rainPeriods.length > 0 && (
          <div className="rain-alerts">
            <h4>Rain Forecast</h4>
            {rainPeriods.map((period, i) => {
              const startTime = hourlyData[period.start].timeFull;
              const endTime = hourlyData[period.end].timeFull;
              return (
                <div key={i} className="rain-period">
                  💧 Rain from {startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                  {endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HourlyForecast;
