const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/weather", async (req, res) => {
  const city = req.query.city;

  if (!city || city.trim() === "") {
    return res.status(400).json({
      error: "Please provide a city name."
    });
  }

  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("❌ API_KEY is not set in the .env file!");

    return res.status(500).json({
      error: "Server configuration error: API key missing."
    });
  }

  const apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())}&appid=${apiKey}`;

  console.log(`🌍 Fetching weather for: "${city}"`);

  console.log(
    `🔗 Request URL (key hidden): ${apiUrl.replace(apiKey, "***")}`
  );

  try {
    const apiResponse = await fetch(apiUrl);

    const data = await apiResponse.json();

    console.log(
      "📦 Raw API response:",
      JSON.stringify(data, null, 2)
    );

    if (!apiResponse.ok) {
      const message =
        data.message
          ? `OpenWeatherMap error: ${data.message}`
          : "City not found or API error.";

      return res
        .status(apiResponse.status)
        .json({ error: message });
    }

    const tempCelsius =
      (data.main.temp - 273.15).toFixed(1);

    const weatherData = {
      city: data.name,
      temperature: `${tempCelsius}°C`,
      description: data.weather[0].description,
      humidity: `${data.main.humidity}%`,
      windSpeed: `${data.wind.speed} m/s`,
    };

    console.log("✅ Sending weather data:", weatherData);

    return res.status(200).json(weatherData);

  } catch (error) {
    console.error(
      "❌ Error calling OpenWeatherMap API:",
      error.message
    );

    return res.status(500).json({
      error: "Failed to fetch weather data. Please try again."
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    status: "Weather API server is running 🚀"
  });
});

app.listen(PORT, () => {
  console.log(
    `\n🚀 Weather API server is running on http://localhost:${PORT}`
  );

  console.log(
    `   Try: http://localhost:${PORT}/weather?city=London\n`
  );
});