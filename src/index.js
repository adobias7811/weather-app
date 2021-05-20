///////// Calcutale Date & Time

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    return `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

////////// Display Specified Weather for Location

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  let weatherCondition = document.querySelector("#weather-description");
  let maxTemp = Math.round(response.data.main.temp_max);
  let maxTempElement = document.querySelector("#high-temp");
  let minTemp = Math.round(response.data.main.temp_min);
  let minTempElement = document.querySelector("#low-temp");
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("icon");

  temperatureElement.innerHTML = `${temperature}°F`;
  weatherCondition.innerHTML = response.data.weather[0].description;
  maxTempElement.innerHTML = `${maxTemp}°F`;
  minTempElement.innerHTML = `${minTemp}°F`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `${windSpeed} mph`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", "response.data.weather[0].description");
}
////////// Default View - Display Current Weather Default by Geo-location

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "imperial";

  console.log(latitude);
  console.log(longitude);

  let apiKey = "9c82592b70e35c40d22dd8f8facfbc64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showWeather);
}
navigator.geolocation.getCurrentPosition(retrievePosition);

//////////// Search for desired city

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
