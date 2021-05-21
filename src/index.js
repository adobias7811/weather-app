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

/////////// Display Forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class=row>`;
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
          <h2 id="forecast-day-1">${day}</h2>
            <img src="http://openweathermap.org/img/wn/01d@2x.png" class="forecast-weather-icon" id="forecast-icon-1" alt="sun-icon">
            <p class="forecast-temps">
              <span class="forecast-temp-max">80°</span> <br />
              <span class="forecast-temp-min">74°</span>
            </p>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

////////// Display Specified Weather for Location

function showWeather(response) {
  console.log(response.data);
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

//////////// Convert to Celcius/Fahrenheit

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

displayForecast();

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

searchCity("Key West");
