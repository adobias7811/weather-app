// Calcutale Date & Time

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

  let currentDate = document.querySelector("#current-day-time");

  currentDate.innerHTML = `${day} ${hour}:${minutes}`;
}

// Default View - Display Current Weather Default by Geo-location

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
  let dateElement = document.querySelector("#current-day");

  temperatureElement.innerHTML = `${temperature}°F`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  maxTempElement.innerHTML = `${maxTemp}°F`;
  minTempElement.innerHTML = `${minTemp}°F`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `${windSpeed} mph`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
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
//Weather Condition Icons

let weatherCondition = response.data.weather[0].main;
if (weatherCondition === "Clear") {
  document.querySelector("#weather-description").innerHTML = "Sunny";
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", "images/sunny.svg");
  document.querySelector("#background").classList.add("containerSunny");
  document
    .querySelector("#background")
    .classList.remove(
      "containerCloudy",
      "containerPartlyCloudy",
      "containerRaining",
      "containerSnowing"
    );
}
if (weatherSituation === "Clouds") {
  document.querySelector("#weather-description").innerHTML = "Cloudy";
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", "images/cloudy.svg");
  document.querySelector("#background").classList.add("containerCloudy");
  document
    .querySelector("#background")
    .classList.remove(
      "containerSunny",
      "containerPartlyCloudy",
      "containerRaining",
      "containerSnowing"
    );
}
if (weatherSituation === "Mist") {
  document.querySelector("#weather-description").innerHTML = "Misty";
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", "images/chancerain.svg");
  document.querySelector("#background").classList.add("containerCloudy");
  document
    .querySelector("#background")
    .classList.remove(
      "containerSunny",
      "containerPartlyCloudy",
      "containerRaining",
      "containerSnowing"
    );
}
if (weatherSituation === "Smoke") {
  document.querySelector("#weather-description").innerHTML = "Smokey";
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", "images/cloudy.svg");
  document.querySelector("#background").classList.add("containerCloudy");
  document
    .querySelector("#background")
    .classList.remove(
      "containerSunny",
      "containerPartlyCloudy",
      "containerRaining",
      "containerSnowing"
    );
}
if (weatherSituation === "Haze") {
  document.querySelector("#weather-description").innerHTML = "Hazy";
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", "images/hazy.svg");
  document.querySelector("#background").classList.add("containerCloudy");
  document
    .querySelector("#background")
    .classList.remove(
      "containerSunny",
      "containerPartlyCloudy",
      "containerRaining",
      "containerSnowing"
    );
}
if (weatherSituation === "Dust") {
  document.querySelector("#weather-description").innerHTML = "Dusty";
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", "images/hazy.svg");
  document.querySelector("#background").classList.add("containerPartlyCloudy");
  document
    .querySelector("#background")
    .classList.remove(
      "containerSunny",
      "containerCloudy",
      "containerRaining",
      "containerSnowing"
    );
}
if (weatherSituation === "Fog") {
  document.querySelector("#weather-description").innerHTML = "Foggy";
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", "images/fog.svg");
  document.querySelector("#background").classList.add("containerCloudy");
  document
    .querySelector("#background")
    .classList.remove(
      "containerSunny",
      "containerPartlyCloudy",
      "containerRaining",
      "containerSnowing"
    );
}
if (weatherSituation === "Sand") {
  document.querySelector("#weather-description").innerHTML = "Sandy";
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", "images/hazy.svg");
  document.querySelector("#background").classList.add("containerCloudy");
  document
    .querySelector("#background")
    .classList.remove(
      "containerSunny",
      "containerPartlyCloudy",
      "containerRaining",
      "containerSnowing"
    );
}
if (weatherSituation === "Ash") {
  document.querySelector("#current-weather-icon").innerHTML = "Ashy";
  document
    .querySelector("#main-image")
    .setAttribute("src", "images/cloudy.svg");
  document.querySelector("#background").classList.add("containerSnowing");
  document
    .querySelector("#background")
    .classList.remove(
      "containerSunny",
      "containerCloudy",
      "containerPartlyCloudy",
      "containerRaining"
    );
}
if (weatherSituation === "Squall") {
  document.querySelector("#weather-description").innerHTML = "Windy";
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", "images/tstorms.svg");
  document.querySelector("#background").classList.add("containerRaining");
  document
    .querySelector("#background")
    .classList.remove(
      "containerSunny",
      "containerCloudy",
      "containerRaining",
      "containerSnowing"
    );
}
if (weatherSituation === "Tornado") {
  document.querySelector("#weather-description").innerHTML = "Tornado";
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", "images/chancestorms.svg");
  document.querySelector("#background").classList.add("containerRaining");
  document
    .querySelector("#background")
    .classList.remove(
      "containerSunny",
      "containerCloudy",
      "containerPartlyCloudy",
      "containerSnowing"
    );
}
if (weatherSituation === "Snow") {
  document.querySelector("#weather-description").innerHTML = "Snowy";
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", "images/snow.svg");
  document.querySelector("#background").classList.add("containerSnowing");
  document
    .querySelector("#background")
    .classList.remove(
      "containerSunny",
      "containerCloudy",
      "containerPartlyCloudy",
      "containerRaining"
    );
}
if (weatherSituation === "Rain") {
  document.querySelector("#weather-description").innerHTML = "Rainy";
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", "images/rain/svg");
  document.querySelector("#background").classList.add("containerRaining");
  document
    .querySelector("#background")
    .classList.remove(
      "containerSunny",
      "containerCloudy",
      "containerPartlyCloudy",
      "containerSnowing"
    );
}
if (weatherSituation === "Drizzle") {
  document.querySelector("#weather-description").innerHTML = "Drizzly";
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", "images/chancerain.svg");
  document.querySelector("#background").classList.add("containerRaining");
  document
    .querySelector("#background")
    .classList.remove(
      "containerSunny",
      "containerCloudy",
      "containerPartlyCloudy",
      "containerSnowing"
    );
}
if (weatherSituation === "Thunderstorm") {
  document.querySelector("#weather-description").innerHTML = "Stormy";
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", "images/tstorms.svg");
  document.querySelector("#background").classList.add("containerRaining");
  document
    .querySelector("#background")
    .classList.remove(
      "containerSunny",
      "containerCloudy",
      "containerPartlyCloudy",
      "containerSnowing"
    );
}
