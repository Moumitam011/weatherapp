// API key for OpenWeatherMap API
const apiKey = "05e5f7741062cc4fb94b693d994c9a46";

// Fetch weather data from OpenWeatherMap API
function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        throw new Error("City not found");
      }
      updateWeatherUI(data);
      updateBackgroundImage(data);
    })
    .catch((error) => {
      console.log("Error fetching weather data:", error);
      if (error.message === "City not found") {
        alert("City not found");
      }
    });
}


// Update the UI with weather data
function updateWeatherUI(data) {
  const temperatureElement = document.querySelector(".temperature");
  const cityNameElement = document.querySelector(".city-name");
  const timeElement = document.querySelector(".time");
  const dateElement = document.querySelector(".date");
  const weatherIconElement = document.querySelector(".icon");
  const conditionElement = document.querySelector(".condition");
  const cloudElement = document.querySelector(".cloud");
  const humidityElement = document.querySelector(".humidity");
  const windElement = document.querySelector(".wind");

  temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
  cityNameElement.textContent = data.name;
  timeElement.textContent = getCurrentTime();
  dateElement.textContent = getCurrentDate();
  weatherIconElement.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  conditionElement.textContent = data.weather[0].description;
  cloudElement.textContent = `${data.clouds.all}%`;
  humidityElement.textContent = `${data.main.humidity}%`;
  windElement.textContent = `${data.wind.speed} km/h`;
}

// Update the background image based on weather conditions and day/night time
function updateBackgroundImage(data) {
  const weatherCode = data.weather[0].id;
  const isDayTime = isDay();
  const bodyElement = document.querySelector(".weather");

  if (isDayTime) {
    if (weatherCode === 800) {
      bodyElement.style.backgroundImage = "url('./asset/day/clearsky.jpg')";
    } else if (weatherCode >= 801 && weatherCode <= 804) {
      bodyElement.style.backgroundImage = "url('./asset/day/cloudy2.jpg')";
    } else if (weatherCode >= 500 && weatherCode <= 531) {
      bodyElement.style.backgroundImage = "url('./asset/day/rainyday.jpg')";
    }
      else if (weatherCode >= 200 && weatherCode <= 232) {
        bodyElement.style.backgroundImage = "url('./asset/day/thunder_day.jpg')";
    } else if (weatherCode >= 600 && weatherCode <= 622) {
      bodyElement.style.backgroundImage = "url('./asset/day/snow.jpg')";
    } else {
      bodyElement.style.backgroundImage = "url('./asset/day/cloudy1.jpg')";
    }
  } else {
    if (weatherCode === 800) {
      bodyElement.style.backgroundImage = "url('./asset/night/night.jpg')";
    } else if (weatherCode >= 801 && weatherCode <= 804) {
      bodyElement.style.backgroundImage = "url('./asset/night/cloudy_night.jpg')";
    } else if (weatherCode >= 500 && weatherCode <= 531) {
      bodyElement.style.backgroundImage = "url('./asset/night/rainy_night.jpg')";
    } 
    else if (weatherCode >= 200 && weatherCode <= 232) {
      bodyElement.style.backgroundImage = "url('./asset/day/thunder_night.jpg')";
  }
    else if (weatherCode >= 600 && weatherCode <= 622) {
      bodyElement.style.backgroundImage = "url('./asset/night/snow_night.jpg')";
    } else {
      bodyElement.style.backgroundImage = "url('./asset/night/night.jpg')";
    }
  }
}

// Check if it's currently day time based on current hour
function isDay() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 6 && hour < 18;
}

// Get the current time in HH:MM format
function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

// Get the current date in Month DD, YYYY format
function getCurrentDate() {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Date().toLocaleDateString(undefined, options);
}

// Event listener for the form submission
document.getElementById("locationInput").addEventListener("submit", function (event) {
  event.preventDefault();
  const cityInput = document.getElementById("city");
  const city = cityInput.value.trim();
  if (city !== "") {
    fetchWeatherData(city);
    cityInput.value = "";
  }
});

// Initialize the weather with a default city
fetchWeatherData("London");
 
// Event listener for the form submission
document.getElementById("locationInput").addEventListener("submit", function (event) {
  event.preventDefault();
  const cityInput = document.getElementById("city");
  const city = cityInput.value.trim();
  if (city !== "") {
    fetchWeatherData(city);
    cityInput.value = "";
  }
});

// Add click event to each city in the "point" class
const cities = document.querySelectorAll(".point .city");
cities.forEach((city) => {
  city.addEventListener("click", (event) => {
    const selectedCity = event.target.textContent;
    fetchWeatherData(selectedCity);
    fadeOutApp();
  });
});

// Fade out the app with a simple transition
function fadeOutApp() {
  const weatherApp = document.querySelector(".weather");
  weatherApp.style.transition = "opacity 0.5s";
  weatherApp.style.opacity = "0";

  // Set opacity to 1 after a short delay
  setTimeout(() => {
    weatherApp.style.opacity = "1";
  }, 500);
}
