const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather-btn");
const loadingIndicator = document.getElementById("loading-indicator");
const errorBox = document.getElementById("error-box");
const errorMessage = document.getElementById("error-message");
const weatherCard = document.getElementById("weather-card");

const cityNameEl = document.getElementById("city-name");
const weatherIconEl = document.getElementById("weather-icon");
const weatherDescEl = document.getElementById("weather-desc");
const temperatureEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");
const lastUpdatedEl = document.getElementById("last-updated");

const cityChips = document.querySelectorAll(".city-chip");

const RENDER_BACKEND_URL = "https://weather-backend-qfp7.onrender.com";

const BACKEND_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : RENDER_BACKEND_URL;

function getWeatherIcon(description) {
  const desc = description.toLowerCase();

  if (desc.includes("thunderstorm")) return "⛈️";
  if (desc.includes("drizzle")) return "🌦️";
  if (desc.includes("rain")) return "🌧️";
  if (desc.includes("snow")) return "❄️";

  if (
    desc.includes("mist") ||
    desc.includes("fog") ||
    desc.includes("haze")
  ) {
    return "🌫️";
  }

  if (desc.includes("clear")) return "☀️";
  if (desc.includes("few clouds")) return "🌤️";
  if (desc.includes("scattered")) return "⛅";

  if (
    desc.includes("broken") ||
    desc.includes("overcast")
  ) {
    return "☁️";
  }

  return "🌡️";
}

function showLoading() {
  loadingIndicator.classList.remove("hidden");
  errorBox.classList.add("hidden");
  weatherCard.classList.add("hidden");
  getWeatherBtn.disabled = true;
}

function hideLoading() {
  loadingIndicator.classList.add("hidden");
  getWeatherBtn.disabled = false;
}

function showError(message) {
  errorBox.classList.remove("hidden");
  errorMessage.textContent = message;
  weatherCard.classList.add("hidden");
}

function hideError() {
  errorBox.classList.add("hidden");
}

function showWeatherCard(data) {
  cityNameEl.textContent = data.city;
  weatherDescEl.textContent = data.description;
  temperatureEl.textContent = data.temperature;
  humidityEl.textContent = data.humidity;
  windSpeedEl.textContent = data.windSpeed;

  weatherIconEl.textContent = getWeatherIcon(data.description);

  const now = new Date();

  lastUpdatedEl.textContent =
    `Updated at ${now.toLocaleTimeString()}`;

  weatherCard.classList.remove("hidden");
}

async function fetchWeather(city) {
  if (!city || city.trim() === "") {
    showError("Please enter a city name before searching.");
    return;
  }

  showLoading();
  hideError();

  try {
    const url =
      `${BACKEND_URL}/weather?city=${encodeURIComponent(city.trim())}`;

    console.log(`📡 Calling backend: ${url}`);

    const response = await fetch(url);

    const data = await response.json();

    console.log("📦 Response from backend:", data);

    if (!response.ok) {
      throw new Error(
        data.error || `Server returned status ${response.status}`
      );
    }

    showWeatherCard(data);

  } catch (error) {
    console.error("❌ Error fetching weather:", error.message);

    showError(
      error.message || "Something went wrong. Please try again."
    );

  } finally {
    hideLoading();
  }
}

getWeatherBtn.addEventListener("click", () => {
  fetchWeather(cityInput.value);
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchWeather(cityInput.value);
  }
});

cityChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const city = chip.dataset.city;

    cityInput.value = city;

    fetchWeather(city);
  });
});

cityInput.focus();