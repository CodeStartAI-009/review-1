const API_KEY = "c7e2aa9c576616f325ae9cbf52c1fcc4"; // your API key

// ✅ Get coordinates
export async function getCoordinates(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        city
      )}&limit=1&appid=${API_KEY}`
    );

    if (!res.ok) throw new Error("Geo API request failed");

    const data = await res.json();
    if (!data || data.length === 0) return null;

    return {
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].name,
      country: data[0].country,
    };
  } catch (err) {
    console.error("Error fetching coordinates:", err);
    return null;
  }
}

// ✅ Get current weather
export async function getCurrentWeather(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!res.ok) throw new Error("Weather API request failed");
    return res.json();
  } catch (err) {
    console.error("Error fetching current weather:", err);
    return null;
  }
}

// ✅ Get forecast (5-day / 3-hourly)
export async function getForecast(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!res.ok) throw new Error("Forecast API request failed");
    return res.json();
  } catch (err) {
    console.error("Error fetching forecast:", err);
    return null;
  }
}