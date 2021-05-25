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
          <p class="future-temp" class="icon">
          ${weatherIcons(
            forecastDay.weather[0].icon,
            forecastDay.weather[0].main
          )}
          </p>
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

////////// Weather Icons

function weatherIcons(weatherIcon, currentWeather) {
  let forecastIcon = "";
  if (weatherIcon === "01d") {
    forecastIcon = '<img src="img/icons/sunny.svg">';
  } else if (weatherIcon === "01n") {
    forecastIcon = '<img src="img/icons/night_clear.png">';
  } else if (currentWeather === "Clouds" || currentWeather === "Fog") {
    forecastIcon = '<img src="img/icons/cloudy.svg">';
  } else if (
    currentWeather === "Thunderstorm" ||
    currentWeather === "Tornado"
  ) {
    forecastIcon = '<img src="img/icons/tstorms.svg">';
  } else if (currentWeather === "Rain") {
    forecastIcon = '<img src="img/icons/rain.svg">';
  } else if (currentWeather === "Drizzle") {
    forecastIcon = '<img src="img/icons/chancerain.svg">';
  } else if (currentWeather === "Snow") {
    forecastIcon = '<img src="img/icons/snow.svg">';
  } else if (weatherIcon === "02d") {
    forecastIcon = '<img src="img/icons/partlycloudy.svg">';
  } else if (weatherIcon === "02n") {
    forecastIcon = '<img src="img/icons/cloudy.svg">';
  } else {
    forecastIcon = '<img src="img/icons/sunny.svg">';
  }
  return forecastIcon;
}

////////// Get Forecast
function getForecast(coordinates) {
  let apiKey = "9c82592b70e35c40d22dd8f8facfbc64";
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
  iconElement.innerHTML = weatherIcons(
    response.data.weather[0].icon,
    response.data.weather[0].main
  );

  let outsideWeather = response.data.weather[0].main;
  if (
    outsideWeather === "Clouds" ||
    outsideWeather === "Mist" ||
    outsideWeather === "Smoke" ||
    outsideWeather === "Haze" ||
    outsideWeather === "Fog" ||
    outsideWeather === "Sand" ||
    outsideWeather === "Dust"
  ) {
    document
      .querySelector("#background")
      .classList.remove(
        "sunnyContainer",
        "rainingContainer",
        "snowingContainer"
      );
    document.querySelector("#background").classList.add("cloudyContainer");
    document.querySelector("#icon").setAttribute("src", "img/icons/cloudy.svg");
  }

  if (
    outsideWeather === "Rain" ||
    outsideWeather === "Squall" ||
    outsideWeather === "Tornado" ||
    outsideWeather === "Drizzle" ||
    outsideWeather === "Thunderstorm"
  ) {
    document
      .querySelector("#background")
      .classList.remove(
        "sunnyContainer",
        "cloudyContainer",
        "snowingContainer"
      );
    document.querySelector("#background").classList.add("rainingContainer");
    document.querySelector("#icon").setAttribute("src", "img/icons/rain.svg");
  }

  if (outsideWeather === "Snow" || outsideWeather === "Ash") {
    document
      .querySelector("#background")
      .classList.remove(
        "sunnyContainer",
        "cloudyContainer",
        "rainingContainer"
      );
    document.querySelector("#background").classList.add("snowingContainer");
    document.querySelector("#icon").setAttribute("src", "img/icons/snow.svg");
  }
  if (outsideWeather === "Clear") {
    document
      .querySelector("#background")
      .classList.remove(
        "cloudyContainer",
        "rainingContainer",
        "snowingContainer"
      );
    document.querySelector("#background").classList.add("sunnyContainer");
    document.querySelector("#icon").setAttribute("src", "img/icons/sunny.svg");
  }

  console.log(response.data);
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
  document.querySelector("#current-city").innerHTML = city;
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
