import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapUpdater from "./MapUpdater";
import '../style/WeatherMap.css';

// Configure default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png",
});

function WeatherMap({ coords, weather, locationName }) {
  if (!coords) return null;

  return (
    <div className="weather-map-container">
      <MapContainer center={coords} zoom={11} className="leaflet-container">
        <MapUpdater coords={coords} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {weather && (
          <Marker position={coords}>
            <Popup>
              <p className="font-bold">{locationName}</p>
              <p>🌡 Temp: {Math.round(weather.main.temp)}°C</p>
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>🌬 Wind: {weather.wind.speed} m/s</p>
            </Popup>
            <Tooltip>{locationName}</Tooltip>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default WeatherMap;
