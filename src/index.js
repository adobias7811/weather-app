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

/////////// Display Forecast

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class=row>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <h2 id="forecast-day-1">${formatDay(forecastDay.dt)}</h2>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" class="forecast-weather-icon" id="forecast-icon-1" alt="sun-icon">
            <p class="forecast-temps">
              <span class="forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}° </span> |
              <span class="forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}° </span>
            </p>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

////////// Get Forecast
function getForecast(coordinates) {
  let apiKey = "9c82592b70e35c40d22dd8f8facfbc64";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

////////// Display Specified Weather for Location

function showWeather(response) {
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
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
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

  getForecast(response.data.coord);
}

////////// Default View - Display Current Weather Default by Geo-location

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "imperial";

  let apiKey = "9c82592b70e35c40d22dd8f8facfbc64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showWeather);
}
navigator.geolocation.getCurrentPosition(retrievePosition);

//////////// Search for desired city

function searchCity(city) {
  let units = "imperial";
  let apiKey = "9c82592b70e35c40d22dd8f8facfbc64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = city;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Key West");
