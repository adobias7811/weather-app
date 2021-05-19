// Display Date & Time

let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${day}`;

function formatTime(currentDate) {
  let currentTime = document.querySelector("#current-time");
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    return `0${minutes}`;
  }
  currentTime.innerHTML = ` ${hour}:${minutes}`;
}
formatTime(currentDate);

// Display Current Weather Default by Geo-location

function currentWeather(response) {
  console.log();
  let temperature = Math.round(response.data.main.temp);
  let currentLocation = document.querySelector("#current-city");
  let currentTemp = document.querySelector("#current-temp");
  currentLocation.innerHTML = `${response.data.name}`;
  currentTemp.innerHTML = `${temperature}°F`;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "imperial";

  console.log(latitude);
  console.log(longitude);

  let apiKey = "9c82592b70e35c40d22dd8f8facfbc64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(currentWeather);
}
navigator.geolocation.getCurrentPosition(retrievePosition);

//////////// Search & Display Specified Weather for Location

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  let weatherDescription = document.querySelector("#weather-description");
  let maxTemp = Math.round(response.data.main.temp_max);
  let maxTempElement = document.querySelector("#high-temp");
  let minTemp = Math.round(response.data.main.temp_min);
  let minTempElement = document.querySelector("#low-temp");
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#wind-speed");

  temperatureElement.innerHTML = `${temperature}°F`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  maxTempElement.innerHTML = `${maxTemp}°F`;
  minTempElement.innerHTML = `${minTemp}°F`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `${windSpeed} mph`;
}

function searchCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  let searchCity = document.querySelector("#city-form");
  let apiKey = "9c82592b70e35c40d22dd8f8facfbc64";

  let units = "imperial";
  let city = searchCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  currentCity.innerHTML = searchCity.value;
  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

///////////////
